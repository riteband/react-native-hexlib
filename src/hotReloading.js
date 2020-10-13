import AsyncStorage from "@react-native-community/async-storage";
import React from "react";

const stateId = "hotReloadingState";

function persistState(key, state) {
    // Hot reloading
    const storeData = async () => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(state))
        } catch (e) {
            console.error(e);
            // saving error
        }
    };
    storeData();
}

async function loadState({appEngine, sideEffectFns, createState}) {
    try {
        const storedState = await AsyncStorage.getItem('@app_state');

        sideEffectFns.forEach(function (fn) {
            appEngine.addSideEffectFn(fn);
        });
        if (storedState !== null) {
            console.log("Found storage value");
            appEngine.swapState(function (_state) {
                let state = {..._state, ...JSON.parse(storedState)};
                state[stateId].fetching = false;
                state[stateId].success = true;
                return state;
            });
        } else {
            console.log("Found no storage value");
            appEngine.swapState(function (_state) {
                let state = {..._state, ...createState()};
                state[stateId].renderKey = 0;
                state[stateId].fetching = false;
                state[stateId].success = true;
                return state;
            });
        }
    } catch (e) {
        console.log("Async Storage failed: ", e);
        sideEffectFns.forEach(function (fn) {
            appEngine.addSideEffectFn(fn);
        });
        appEngine.swapState(function (_state) {
            let state = {..._state, ...createState()};
            state[stateId].renderKey = 0;
            state[stateId].fetching = false;
            state[stateId].success = false;
            return state;
        });
    }
}

export function HotReloading({enabled, createState, appEngine, sideEffectFns}) {
    if (enabled) {
        if (__DEV__) {
            const DevMenu = require('react-native-dev-menu');
            DevMenu.addItem('Reset Hot Reloading State', () => {
                appEngine.swapState(function (_state) {
                    let state = {..._state, ...createState()};
                    state[stateId].renderKey++;
                    state[stateId].fetching = false;
                    state[stateId].success = true;
                    state[stateId].navigationState = null;
                    return state;
                });
            });
        }
        appEngine.swapState(function (state) {
            state[stateId].fetching = true;
            return state;
        });
        appEngine.onStateChange = function ({state}) {
            persistState('@app_state', state);
        };
        loadState({appEngine, sideEffectFns, createState});
    } else {
        console.log("HOT RELOADING DISABLED - RESETTING APP STATE");
        sideEffectFns.forEach(function (fn) {
            appEngine.addSideEffectFn(fn);
        });
        let newState = appEngine.swapState(function (_state) {
            let state = {..._state, ...createState()};
            state[stateId].renderKey = 0;
            state[stateId].fetching = false;
            state[stateId].success = true;
            state[stateId].navigationState = null;
            return state;
        });
        persistState('@app_state', newState);
    }

    return {
        createHotReloadingApp: function ({App}) {
            if (!enabled) {
                return App;
            }

            return function HotReloadingApp(props) {
                if (!props.state[stateId].fetching && props.state[stateId].success) {
                    return <App key={props.state[stateId].renderKey}
                                {...props}
                                initialNavigationState={props.state[stateId].navigationState}
                                onNavigationStateChange={function (navigationState) {
                                    appEngine.swapState(function (state) {
                                        state[stateId].navigationState = navigationState;
                                        return state;
                                    });
                                }}/>;
                }
                return null;
            }
        }
    };
}

export function createHotReloadingState() {
    return {
        hotReloadingState: {fetching: false, success: false, navigationState: null}
    };
}
