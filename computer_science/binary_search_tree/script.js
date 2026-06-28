/* import { mergeSort } from "./mergesort.js"; */

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
        return (value < node.value) ? this.includes(value, node.left) :
            this.includes(value, node.right);
    }

    insert(value, node = this.root) {
        let newnode = new Node(value);
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

    levelOrderForEachIterating(callback, node = this.root) {
        if (!callback) throw new Error("gimme callback");
        if (node === null) return;
        callback(node.value);
        if (this.isLeaf(node)) return;
        let queue = [];
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        while (queue.length > 0) {
            let next = queue.shift();
            callback(next.value);
            if (next.left) queue.push(next.left);
            if (next.right) queue.push(next.right);
        }
    }
    levelOrderRec(callback) {
        const queue = [this.root];
        const result = [];
        if (!callback) throw new Error("gimme callback");
        this.levelOrderForEachRec(callback, queue, result);
        return result;
    }
    levelOrderForEachRec(callback, queue, result) {
        let node = queue.shift();
        if (!node) return;
        callback(node.value, result);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (queue.length > 0) this.levelOrderForEachRec(callback, queue, result);
    }
    inOrderLDRForEachRec(callback) {
        const queue = []
        const result = [];
        if (!callback) throw new Error("gimme callback");
        this.inOrderLDRForEach(callback, queue, this.root, result);
        return result;
    }
    inOrderLDRForEach(callback, queue, node = this.root, array) {
        while (node.left) {
            queue.push(node);
            node = node.left;
        }
        callback(node.value, array);
        if (node.right) this.inOrderLDRForEach(callback, queue, node.right, array);
        while (queue.length > 0) {
            node = queue.pop();
            callback(node.value, array);
            if (node.right) this.inOrderLDRForEach(callback, queue, node.right, array);
        }
    }
    preOrderDLRForEachOuter(callback) {
        if (!callback) throw new Error("gimme callback");
        const result = [];
        const queue = [this.root];
        this.preOrderDLRForEach(callback, queue, result);
        return result;
    }

    preOrderDLRForEach(callback, queue, result) {
        let node = queue.pop();
        callback(node.value, result);
        if (node.right) queue.push(node.right);
        while (node.left) {
            node = node.left;
            callback(node.value, result);
            if (node.right) queue.push(node.right);
        }
        if (queue.length > 0) this.preOrderDLRForEach(callback, queue, result);
    }


    height(value) {
        let node = this.find(value);
        if (!node) { console.log("not in tree"); return; }
        return findheight(node);
    }


    finddepth(value) {
        let node = this.root;
        let counter = 0;
        while ((node) && node.value !== value) {
            node = (value < node.value) ? node.left : node.right;
            counter++;
        }
        if (!node) return;
        if (node.value === value) return counter;
    }

    find(value, node = this.root) {
        if (node === null) return;
        if (node.value === value) {
            console.log("found it: ", node);
            return node;
        }
        return (value < node.value) ? this.find(value, node.left) :
            this.find(value, node.right);
    }
    findheight(node) {
        if (node === null) {
            return -1;
        }
        let lHeight = this.findheight(node.left);
        let rHeight = this.findheight(node.right);

        return Math.max(lHeight, rHeight) + 1;
    }
    postOrderLRDOuter(callback) {
        let result = [];
        this.postOrderLRD_print(callback, this.root, result);
        return result;
    }

    postOrderLRD_print(callback, node = this.root, result) {

        if (!callback) throw new Error("gimme callback");
        if (node == null)
            return;
        if (node.left) this.postOrderLRD_print(callback, node.left, result);

        if (node.right) this.postOrderLRD_print(callback, node.right, result);

        callback(node.value, result);
    }

    postOrderLRD(callback, node = this.root, result) {

        if (!callback) throw new Error("gimme callback");
        if (node == null)
            return;

        // first recur on left subtree
        this.postOrderLRD(callback, node.left, result);

        // then recur on right subtree
        this.postOrderLRD(callback, node.right, result);

        // now deal with the node
        result.push(callback(node));
    }
    postOrderLRD_re(callback, node = this.root, result) {

        if (!callback) throw new Error("gimme callback");
        if (node == null)
            return;
        if (node.left) this.postOrderLRD_re(callback, node.left, result);

        if (node.right) this.postOrderLRD_re(callback, node.right, result);

        callback(node);
    }

    isBalancedLRD() {
        let result = [];
        this.postOrderLRD((this.isBalanced.bind(this)), this.root, result);
        console.log(result);
        return !result.includes(false);
        //am eleg lenne addig menni amig egy false-t talal, nem kell minnden node-ot bevizsgalni
    }

    isBalanced(node = this.root) {
        if (this.isLeaf(node)) return true;
        let lHeight = (node.left) ? this.findheight(node.left) : -1;
        let rHeight = (node.right) ? this.findheight(node.right) : -1;
        return (Math.abs(lHeight - rHeight) <= 1);
    }
    reBalance() {
        let result = [];
        this.postOrderLRD_re((node) => result.push(node.value), this.root, result);
        this.root = this.#buildTree(result);
        return this.root;
    }


    isLeaf(node) {
        return (!node.left && !node.right);
    }
    delete(value, node = this.root, parentnode = null) { //2,{1},{5}

        if (node.value === value && (!this.isLeaf(node))) {
            let newroot = node.left ?? node.right;
            if (node === this.root) this.root = newroot;
            if (parentnode) {
                (parentnode.value > value)
                    ? parentnode.left = newroot
                    : parentnode.right = newroot;
            }
            console.log(newroot);
            while (newroot.right !== null) {
                newroot = newroot.right;
            }
            newroot.right = node.right;
            node = null;
            return;
        }
        debugger;
        if ((node.left) && node.left.value === value && this.isLeaf(node.left)) {
            node.left = null;
            return;
        }
        if (((node.right) && node.right.value === value) && (this.isLeaf(node.right))) {
            node.right = null;
            return;
        }
        if (value < node.value) this.delete(value, node.left, node);
        else if (value > node.value) this.delete(value, node.right, node);
    }

    #buildTree(array) {
        array = array.reduce((prev, curr) => {
            if (!prev.includes(curr)) prev.push(curr);
            return prev;
        }, []);
        array.sort((a, b) => a - b);
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

function randomArray(length) {
    const array = [];
    function generator() { return Math.floor(Math.random() * 100) };
    while (array.length < length) {
        array.push(generator());
    }
    return array;
}

function printToArr(value, array) {
    array.push(value);
}

let arr = randomArray(7);
console.log(arr);

let tree = new Tree(arr);

console.log(tree);
prettyPrint(tree.root);

console.log("is it balanced? ", tree.isBalancedLRD());
console.log("print level order: ", tree.levelOrderRec(printToArr));
console.log("print preorder: ", tree.preOrderDLRForEachOuter(printToArr));
console.log("print postorder: ", tree.postOrderLRDOuter(printToArr));
console.log("print inorder: ", tree.inOrderLDRForEachRec(printToArr));
tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log("is it balanced? ", tree.isBalancedLRD());
prettyPrint(tree.root);
tree.reBalance();
console.log("is it balanced? ", tree.isBalancedLRD());
prettyPrint(tree.root);
console.log("print level order: ", tree.levelOrderRec(printToArr));
console.log("print preorder: ", tree.preOrderDLRForEachOuter(printToArr));
console.log("print postorder: ", tree.postOrderLRDOuter(printToArr));
console.log("print inorder: ", tree.inOrderLDRForEachRec(printToArr));