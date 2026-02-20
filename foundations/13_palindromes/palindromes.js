const palindromes = function (string) {
    let stripped = string
        .toLowerCase()
        //solution has nifty solution to strip, defining valid characters in a new variable then filtering through it, me likey.
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .replaceAll("!", "")
        .replaceAll(".", "");
    console.log(stripped);
    let reverse = stripped.split("");
    console.log(reverse);
    reverse = reverse.reverse();
    console.log(reverse);
    reverse = reverse.join("");
    console.log(reverse);
    if (stripped == reverse) return true;
    else return false;
};

// Do not edit below this line
module.exports = palindromes;
