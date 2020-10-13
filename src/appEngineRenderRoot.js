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
            var state = appEngine.stateStore.getState();

            return (
                <App state={state} changeState={appEngine.stateStore.changeState} appEngine={appEngine} />
            );
        }
    }
}

export function withSideEffects({App, performSideEffectsFns}) {
    return function (props) {
        useEffect(() => {
            props.appEngine.addPerformSideEffectsFns(performSideEffectsFns);
            return function cleanup() {
                props.appEngine.removePerformSideEffectsFns(performSideEffectsFns);
            }
        }, []);

        return <App {...props} />;
    }
}
