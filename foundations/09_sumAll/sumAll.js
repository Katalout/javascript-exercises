const sumAll = function (a, b) {
    if (
        a < 0 ||
        b < 0 ||
        Math.floor(a) !== a ||
        Math.floor(b) !== b ||
        (typeof a) !== "number" ||
        (typeof b) !== "number"
    ) return "ERROR";
    let sum = 0;
    if (a > b) {
        for (i = b; i <= a; i++) {
            sum = sum + i;
        }
    }
    for (i = a; i <= b; i++) {
        sum = sum + i;
    }
    return sum;
};

// Do not edit below this line
module.exports = sumAll;
