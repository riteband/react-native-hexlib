import Atom from './atom';

describe('Atom', function () {
    it('deref', function () {
        let atom = Atom({a: "a"});
        expect(atom.deref()).toEqual({a: "a"});
    });
    it('reset', function () {
        let atom = Atom({a: "a"});

        expect(atom.reset({a: "aa"})).toEqual({a: "aa"});
        expect(atom.deref()).toEqual({a: "aa"});
    });
    it('swap', function () {
        let atom = Atom({});

        function swapFn(state) {
            state.a = "a";
            return state
        }

        expect(atom.swap(swapFn)).toEqual({a: "a"});
        expect(atom.deref()).toEqual({a: "a"});

        function swapFnWithArgs(state, value) {
            state.a = value;
            return state
        }

        expect(atom.swap(swapFnWithArgs, "aa")).toEqual({a: "aa"});

        function swapFnWithError(state) {
            state.a = "a";
        }

        function callSwapFn() {
            atom.swap(swapFnWithError);
        }

        // Calling swap in expect does not work, jest needs a function (not a function call).
        expect(callSwapFn).toThrowError();
    });
    it('onChange', function () {
        let atom = Atom({a: "a"});
        const listener = jest.fn();
        atom.onChange(listener);
        atom.reset({a: "aa"});
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({a: "aa"});

        function swapFn(state) {
            state.a = "aaa";
            return state;
        }

        atom.swap(swapFn);
        expect(listener).toHaveBeenCalledTimes(2);
        expect(listener).toHaveBeenCalledWith({a: "aaa"});

        const listener2 = jest.fn();
        atom.onChange(listener2);
        atom.reset({a: "a"});
        expect(listener).toHaveBeenCalledTimes(2);
        expect(listener2).toHaveBeenCalledTimes(1);
        expect(listener2).toHaveBeenCalledWith({a: "a"});
    });
});
