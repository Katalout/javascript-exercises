import { HashMap } from "./script.js";

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test, "overlimit? ", test.isOverLimit);

test.set("banana", "ripe");
test.set("dog", "marble");

console.log("overlimit? ", test.isOverLimit, "loadlevel: ", test.loadlevel);

test.set('moon', 'silver');

console.log(test, "loadlevel: ", test.loadlevel);