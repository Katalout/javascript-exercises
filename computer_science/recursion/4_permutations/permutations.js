const permutations = function (array) {
    const length = array.length;
    const arrayOfPermutations = [];
    if (length <= 1) arrayOfPermutations.push(array);
    if (length > 1) {
        let previous = array.toSpliced(length - 1, 1);
        console.log("previous: ", previous);
        let received = permutations(previous);
        console.log("received: ", received);
        let receivedlength = received.length;
        received.forEach((arrayinstance) => {
            for (let i = length - 1; i >= 0; i--) {
                let newinstance = arrayinstance.toSpliced(i, 0, length);
                console.log("newinstance: ", newinstance);
                arrayOfPermutations.push(newinstance);
            }
        });
    }
    return arrayOfPermutations;
}

// Do not edit below this line
module.exports = permutations;
