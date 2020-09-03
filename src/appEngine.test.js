import AppEngine from './appEngine';

describe('AppEngine', function () {
    it('render optimization', function () {
        var render = jest.fn();
        var onStateChange = jest.fn();
        var performSideEffects = jest.fn(function performSideEffects({state, swapState}) {
            if (state.a < 5) {
                swapState(function (state) {
                    state.a++;
                    return state;
                });
            }
        });


        var appEngine = AppEngine({
            initialState: {a: 0},
            performSideEffects: performSideEffects,
            render: render,
            onStateChange: onStateChange
        });

        expect(performSideEffects).toBeCalledTimes(6);
        expect(render).toBeCalledTimes(1);
        expect(onStateChange).toBeCalledTimes(1);
    });
});
