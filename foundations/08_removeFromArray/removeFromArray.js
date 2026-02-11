const removeFromArray = function (array, item) {
    for (i = 1; i < arguments.length; i++) {
        if (!(array.includes(arguments[i]))) continue;
        array.splice(array.indexOf(arguments[i]), 1);
        if (array.includes(arguments[i])) i--;;
    }
    return array;
};

// Do not edit below this line
module.exports = removeFromArray;
