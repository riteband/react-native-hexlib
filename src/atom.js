export default function Atom(initialValue) {
    let value = initialValue;
    let listener = null;

    function reset(newValue) {
        value = newValue;
        listener && listener(value);
        return newValue;
    }

    return {
        reset: reset,
        swap: function (f, args) {
            if (arguments[0] === value) {
                throw new Error("First argument is the state, you should not pass it in manually. The function given will automatically get the state as the first parameter.");
            }

            let newValue = f.apply(null, [value].concat([].slice.call(arguments, 1)));

            if (!newValue) {
                throw new Error("No state after calling: " + f.name);
            } else {
                return reset(newValue);
            }
        },
        deref: function () {
            return value;
        },
        onChange: function (newListener) {
            listener = newListener;
        }
    }
}
