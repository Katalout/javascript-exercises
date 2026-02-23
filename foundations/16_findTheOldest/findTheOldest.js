const findTheOldest = function (array) {
    let oldest;
    array.reduce((emez, current) => {
        console.log(emez);
        let age;
        if (!("yearOfDeath" in current)) {
            let now = (new Date()).getFullYear();
            age = now - current.yearOfBirth;
        } else age = current.yearOfDeath - current.yearOfBirth;
        console.log(current.name, age);
        if (age > emez) {
            oldest = current;
            emez = age;
        }
        console.log(emez, oldest);
        return emez;
    }, 0);
    return oldest;
};

// Do not edit below this line
module.exports = findTheOldest;
