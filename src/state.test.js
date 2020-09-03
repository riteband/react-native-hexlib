import * as stateUtils from './state';
import Atom from "hexlib/atom";
import {describe, expect, it} from "@jest/globals";

describe('state', function () {
    describe('createSwapSubState', function () {
        it('should work', function () {
            let stateAtom = Atom({
                subState: {
                    a: 2,
                    m: {
                        c: 0
                    }
                },
                b: 3
            });
            function adder(state, id, n) {
                state[id] += n;
                return state;
            }

            let subSwapState = stateUtils.createSwapSubState(stateAtom.swap, "subState");
            subSwapState(adder, "a", 1);
            expect(stateAtom.deref()).toEqual({
                subState: {
                    a: 3,
                    m: {
                        c: 0
                    }
                },
                b: 3
            });

            let subsubSwapState = stateUtils.createSwapSubState(subSwapState, "m");
            subsubSwapState(adder, "c", -1);
            expect(stateAtom.deref()).toEqual({
                subState: {
                    a: 3,
                    m: {
                        c: -1
                    }
                },
                b: 3
            });

            subSwapState = stateUtils.createSwapSubState(stateAtom.swap, ["subState", "m"]);
            subSwapState(adder, "c", 5);
            expect(stateAtom.deref()).toEqual({
                subState: {
                    a: 3,
                    m: {
                        c: 4
                    }
                },
                b: 3
            });
        });
    });
});
