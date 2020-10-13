import React, {Component, useEffect} from "react";

export default function createAppEngineRenderRoot({appEngine, App}) {
    return class AppEngineRenderRoot extends Component {
        constructor(props) {
            super(props);
            var thisComponent = this;
            this.state = {counter: 0};
            appEngine.render = function () {
                thisComponent.setState({counter: thisComponent.state.counter++});
            };
        }

        render() {
            var state = appEngine.stateAtom.deref();

            return (
                <App state={state} swapState={appEngine.stateAtom.swap} appEngine={appEngine} />
            );
        }
    }
}

export function withSideEffects({App, sideEffects}) {
    return function (props) {
        useEffect(() => {
            sideEffects.forEach(function (sideEffect) {
                props.appEngine.addSideEffectFn(sideEffect);
            });
            return function cleanup() {
                sideEffects.forEach(function (sideEffect) {
                    props.appEngine.removeSideEffectFn(sideEffect);
                });
            }
        }, []);

        return <App {...props} />;
    }
}
