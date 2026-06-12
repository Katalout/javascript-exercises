const pascal = function (n) {
    if (n === 1) return [1];
    if (n === 2) {
        return [1, 1];
    }
    if (n > 2) {
        let prev = pascal(n - 1); // [1,1]
        return csereldleabelit(prev);
    }
}

function add(num, next) {
    return num + next;
}

function csereldleabelit(array) { //[1,3,3,1]
    let length = array.length; //4
    let newnumbers = [];
    for (let i = 0; i < length - 1; i++) {
        let added = add(array[i], array[i + 1]);
        newnumbers.push(added);
    }
    let newarray = array.toSpliced(1, length - 2, ...newnumbers);
    return newarray;
}

// Do not edit below this line
module.exports = pascal;
