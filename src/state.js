import _ from "understreck";

// TODO: use understreck version.
function _set(o, p, v) {
    for (var i = 0; i < p.length - 1; i++) {
        if (!o[p[i]]) {
            o[p[i]] = {};
        }
        o = o[p[i]];
    }
    o[p[p.length - 1]] = v;
}

// WARNING: if you change the signature of this function, make sure you change the arguments slicing inside as well.
export function changeSubState(stateId, state, f) {
    stateId = _.isArray(stateId) ? stateId : [stateId];
    const args = [].slice.call(arguments, 3);
    if (!_.get(state, stateId)) {
        console.warn("Undefined substate!");
    }
    _set(state, stateId, f.apply(null, [_.get(state, stateId)].concat(args)));
    return state;
}

// WARNING: if you change the signature of this function, make sure you change the arguments slicing inside as well.
export function swapSubState(swapState, stateId, f) {
    const args = [].slice.call(arguments, 3);
    return swapState(function (state) {
        return changeSubState.apply(null, [stateId, state, f].concat(args));
    });
}

// WARNING: if you change the signature of this function, make sure you change the arguments slicing inside as well.
export function createSwapSubState(swapState, stateId) {
    return swapSubState.bind(null, swapState, stateId);
}
