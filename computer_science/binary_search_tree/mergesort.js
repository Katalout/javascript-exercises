export const mergeSort = function (array) {
    if (array.length <= 1) return array;
    else if (array.length === 2) {
        let felek = felezes(array);
        return sort(felek[0], felek[1]);
    }
    else if (array.length >= 3) {
        let felek = felezes(array);
        let sortedFelek = felek.map((fel) => mergeSort(fel));
        return sort(sortedFelek[0], sortedFelek[1]);
    }

}

function felezes(array) {
    let fele = Math.floor(array.length / 2);
    let elsöfele = array.slice(0, fele);
    let masikfele = array.slice(fele);
    return [elsöfele, masikfele];
}

function sort(array1, array2) {
    let sorted = [];
    while ((array1.length > 0) && (array2.length > 0)) {
        let min;
        if (array1[0] < array2[0]) {
            min = array1.shift();
        }
        else if (array2[0] < array1[0]) {
            min = array2.shift();
        }
        else if (array1[0] === array2[0]) {
            min = array1.shift();
            sorted.push(min);
            array2.shift();
        }
        sorted.push(min);
    }
    sorted.push(...array1, ...array2);
    return sorted;
}
