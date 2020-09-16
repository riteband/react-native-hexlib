export function registerBackgroundService(backgroundServiceFn, args) {
    // var fn = backgroundServiceFn.bind(null, args);
    var fn = backgroundServiceFn;

    // Register background service. Taken from https://github.com/react-native-kit/react-native-track-player/blob/dev/lib/index.js
    if (Platform.OS === 'android') {
        // Registers the headless task
        // AppRegistry.registerHeadlessTask('TrackPlayer', fn);
        throw new Error("Not implemented");
    } else {
        // Initializes and runs the service in the next tick
        setImmediate(fn().bind(null, args));
    }
}

