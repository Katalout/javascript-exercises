const totalIntegers = function (object) {
    if ((typeof object !== "object") || (object === null)) return;
    let counter = 0;
    const nestedobjects = [];
    const arrayOfValues = Object.values(object);
    arrayOfValues.forEach((item) => {
        if (Number.isInteger(item)) counter++
        else if (typeof item === "object" && item !== null) nestedobjects.push(item);
    })
    if (nestedobjects.length > 0) {
        for (let nest of nestedobjects) {
            counter += totalIntegers(nest);
        }
    }
    return counter;
}
// Do not edit below this line
module.exports = totalIntegers;
