const reverseString = function (string) {
    let newString = "";
    for (i = string.length - 1; i >= 0; i--) {
        newString = newString + string.at(i);
    }
    return newString;
};

// Do not edit below this line
module.exports = reverseString;
