const fibonacci = function (num) {
    if (num < 0) return "OOPS";
    if (num == 0) return 0;
    let x = 0;
    let y = 1;
    let result;
    for (i = 0; i < +num; i++) {
        console.log(`x=${x}, y=${y}`);
        result = x + y;
        y = x;
        x = result;
    }
    return result;
}

// Do not edit below this line
module.exports = fibonacci;
