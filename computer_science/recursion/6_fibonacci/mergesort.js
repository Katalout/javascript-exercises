const mergeSort = function (array) {
    console.log("This was printed recursively");
    if (array.length <= 1) return array;
    else if (array.length === 2) {
        let felek = felezes(array);
        return sort(felek[0], felek[1]);
    }
    else if (array.length >= 3) { // [3,2,1,3,5,0,6,2,10,-1,-5,30,-100,0.5,60,65,20,45,-230]
        let felek = felezes(array); // [3,2,1,3,5,0,6,2,10,-1,-5][30,-100,0.5,60,65,20,45,-230]
        let sortedFelek = felek.map((fel) => mergeSort(fel)); //[[2,3],[2,3]]
        return sort(sortedFelek[0], sortedFelek[1]);
    }

}

//ENNYIKEH

//mergeSort([3,2,1,3,5,0,6,2,10,-1,-5,30,-100,0.5,60,65,20,45,-230])


function felezes(array) {
    let fele = Math.floor(array.length / 2);
    let elsöfele = array.slice(0, fele);
    let masikfele = array.slice(fele);
    return [elsöfele, masikfele];

}

function sort(array1, array2) { // sort([1,3,5],[2,3,6]) --> [1, 2, 3, 3, 5, 6]
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

// [2,1] --> make it into [2],[1] --> return sort([2],[1])
// [2,1,3] --> make it into [2,1],[1] --> repeat above for [2,1] --> return sort([1,2],[3])
// [2,1,3,1] --> make it into [2,1],[3,1] --> repeat above for each(map?) --> return sort (egyik, masik)
// [2,1,3,1,4] --> make it into [2,1],[3,1],[4] --> 
console.log("mergeSort([5, 4, 3, 0, -20, 30, -0.2]): ", mergeSort([5, 4, 3, 0, -20, 30, -0.2]));