const contains = function (object, value) {
    const valuesArray = Object.values(object);
    if (valuesArray.includes(value)) return true;
    const innerobjects = valuesArray.filter(item => typeof item === "object" && item !== null);
    return innerobjects.some(innerobject => contains(innerobject, value));

};


const meaningOfLifeArray = [42];
const obj = {
    data: {
        duplicate: "e",
        stuff: {
            thing: {
                banana: NaN,
                moreStuff: {
                    something: "foo",
                    answer: meaningOfLifeArray,
                },
            },
        },
        info: {
            duplicate: "e",
            magicNumber: 44,
            empty: null,
        },
    }
};

//kiköpi magat, amikor nem tud tovabb nestelödni, return false lesz, nem pedig tovabb vizsgalja a felsöbb szintet hmm

//let arr = [42] --> arr == object.values(arr)??

// Do not edit below this line
module.exports = contains;
