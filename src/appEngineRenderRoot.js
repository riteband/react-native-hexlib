import React, {Component} from "react";

export default function createAppEngineRenderRoot({appEngine, App}) {
    return class AppEngineRenderRoot extends Component {
        constructor(props) {
            super(props);
            var thisComponent = this;
            this.state = {counter: 0};
            appEngine.render = function () {
                // if (isMountedRef.current) {
                thisComponent.setState({counter: thisComponent.state.counter++});
                // }
            };
        }

        // componentDidMount() {
        //     setTimeout(function () {
        //         isMountedRef.current = true;
        //     }, 0);
        // }

        render() {
            var thisComponent = this;

            var state = appEngine.stateAtom.deref();

            return (
                <App state={state} swapState={appEngine.stateAtom.swap} appEngine={appEngine}></App>
            );
        }
    }
}
