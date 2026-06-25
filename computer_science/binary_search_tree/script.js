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
        /* return (this.includes(value, node.left) || this.includes(value, node.right)); */
        //but this isnt effective, could be shorter due to it being sorted
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
        if (!callback) throw new Error("gimme callback");
        this.levelOrderForEachRec(callback, queue);
    }
    levelOrderForEachRec(callback, queue) {
        let node = queue.shift();
        if (!node) return;
        callback(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (queue.length > 0) this.levelOrderForEachRec(callback, queue);
    }
    inOrderLDRForEachRec(callback) {
        const queue = []
        if (!callback) throw new Error("gimme callback");
        this.inOrderLDRForEach(callback, queue);
    }
    inOrderLDRForEach(callback, queue, node = this.root) {
        while (node.left) {
            queue.push(node);
            node = node.left;
        }
        callback(node.value);
        if (node.right) this.inOrderLDRForEach(callback, queue, node.right);
        while (queue.length > 0) {
            node = queue.pop();
            callback(node.value);
            if (node.right) this.inOrderLDRForEach(callback, queue, node.right);
        }
    }
    preOrderDLRForEachOuter(callback) {
        if (!callback) throw new Error("gimme callback");
        const queue = [this.root];
        this.preOrderDLRForEach(callback, queue);
    }

    preOrderDLRForEach(callback, queue) {
        let node = queue.pop();
        callback(node.value);
        if (node.right) queue.push(node.right);
        while (node.left) {
            node = node.left;
            callback(node.value);
            if (node.right) queue.push(node.right);
        }
        if (queue.length > 0) this.preOrderDLRForEach(callback, queue);
    }

    postOrderLRD(callback, node = this.root) {
        if (!callback) throw new Error("gimme callback");
        if (node == null)
            return;

        // first recur on left subtree
        this.printPostorder(node.left);

        // then recur on right subtree
        this.printPostorder(node.right);

        // now deal with the node
        callback(node.value);
    }
    height(value) {
        let node = this.find(value);
        if (!node) { console.log("not in tree"); return; }
        let count = 0;
        while (node.left || node.right) {
            node = node.left ?? node.right;
            count++
        }
        return count;
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

let tree = new Tree([1, 5, 9]);

console.log(tree);
prettyPrint(tree.root);
/* let othertree = new Tree([1, 3, 0, 3, 5, 7, 9, 10]);
prettyPrint(othertree.root); */

tree.insert(2);
prettyPrint(tree.root);
debugger;
tree.delete(2);
prettyPrint(tree.root);
