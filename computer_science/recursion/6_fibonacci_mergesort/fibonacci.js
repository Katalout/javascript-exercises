const fibs = function (n) {
    let array = [];
    for (let i = 0; i < n; i++) {
        if (i < 2) array.push(i);
        else {
            let next = array[i - 2] + array[i - 1];
            array.push(next);
        }
    }
    return array;
}



const fibsRec = function (n) {
    console.log("This was printed recursively");
    if (n === 1) {
        return [0];
    }
    if (n === 2) {
        return [0, 1];
    }
    if (n > 2) {
        let array = fibsRec(n - 1); //[0]
        let next = array[array.length - 1] + array[array.length - 2];
        array.push(next);
        return array;
    }
}

console.log("fibonacci(8): ", fibsRec(8));