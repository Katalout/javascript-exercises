const factorial = function (num) {
    if (!Number.isInteger(num) || (num < 0)) return;
    if ((num === 0) || (num === 1)) return 1;
    else return num * factorial(num - 1);
};

// Do not edit below this line
module.exports = factorial;