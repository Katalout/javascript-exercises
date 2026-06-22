import { mergeSort } from "./mergesort.js";

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor(array) {
        this.root = this.#buildTree(array);
    }
    includes(value, node = this.root) {
        if (node == null) return false;
        if (node.value === value) return true;
        return (this.includes(value, node.left) || this.includes(value, node.right));
        /* if (this.includes(value, node.left)) return true;
        else return this.includes(value, node.right); */
    }
    insert(value, node = this.root) {
        let newnode = new Node(value);
        /* if (this.includes(value)) return; */ //bar ezt meg lehetne sporolni nem? ha nincs ott ahova raknam akk nincs benne, nem?
        if (node.value === value) throw new Error("already in here bih");
        if (node.value > value) {
            if (node.left === null) {
                node.left = newnode;
                console.log("inserted after ", node.value);
                return;
            } else this.insert(value, node.left)
        }
        else {
            if (node.right === null) {
                node.right = newnode;
                console.log("inserted after ", node.value);
                return;
            }
            else this.insert(value, node.right)
        }
    }

    #buildTree(array) {
        console.log("arr before sort: ", array);
        array = mergeSort(array);
        array = array.reduce((prev, curr) => {
            if (!prev.includes(curr)) prev.push(curr);
            return prev;
        }, []);
        console.log("arr after sort: ", array);
        return this.#sortedArrayToBST(array, 0, array.length - 1)
    }
    #sortedArrayToBST(array, start, end) {
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);
        root.left = this.#sortedArrayToBST(array, start, mid - 1);
        root.right = this.#sortedArrayToBST(array, mid + 1, end);
        return root;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

let tree = new Tree([1, 7, 5, 4, 3, 10]);


console.log(tree);
prettyPrint(tree.root);
/* let othertree = new Tree([1, 3, 0, 3, 5, 7, 9, 10]);
prettyPrint(othertree.root); */

tree.insert(2);
prettyPrint(tree.root);
tree.insert(8);
prettyPrint(tree.root);