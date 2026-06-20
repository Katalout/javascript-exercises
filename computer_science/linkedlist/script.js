class linkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }
    prepend(value, next = this._head) {
        let node = new Node(value, next);
        this._head = node;
        if (this._size === 0) this._tail = node;
        this._size++;
    }

    append(value) {
        let node = new Node(value);
        (this._size === 0) ? this._head = node : this._tail.next = node;
        this._tail = node;
        this._size++;
    }

    get size() {
        return this._size;
    }
    get head() {
        return this._head ? this._head.value : undefined;
    }
    get tail() {
        return this._tail ? this._tail.value : undefined;
    }
    at(index) {
        if (this._size === 0) return undefined;
        if (index === this._size - 1) return this._tail.value;
        let current = this._head;
        let i = 0;
        while (i < this._size) {
            if (i === index) return current.value;
            current = current.next;
            i++;
        }
    }
    pop() {
        if (this._size === 0) return undefined;
        let head = this._head;
        this._head = this._head.next;
        if (this._size === 1) this._tail = null;
        head.next = null;
        this._size--;
        return head.value;
    }
    contains(value) {
        return this.iterator(value, true, false);
    }

    findIndex(value) {
        return this.iterator(value, "index", -1);
    }
    toString() {
        let string = "";
        let current = this._head;
        let i = 0;
        while (i < this._size) {
            string += `( ${current.value} ) -> `;
            if (i === this._size - 1) string += "null";
            current = current.next;
            i++;
            //this should also be iteratored but i can't be arsed to tweak it
        }
        console.log(string);
        return string;
    }
    insertAt(index, ...values) {
        if (index < 0 || index > this._size) throw new RangeError("nope");
        else {
            let current = this._head;
            if (index === 0) this.insert(null, ...values);
            let i = 0;
            while (i < index) {
                if (i === index - 1) {
                    this.insert(current, ...values);
                }
                current = current.next;
                i++;
            }
            console.log(list.toString());
        };
    }
    insert(prev, ...values) {
        let nextAfterInsert = (prev) ? prev.next : this._head;
        console.log("insert called with: ", prev, values, " nextafterinsert: ", nextAfterInsert);
        let newnodes = values.map((value) => new Node(value, null));
        console.log(newnodes);
        newnodes.forEach((node, index) => {
            console.log(node);
            if (index === 0) { (prev) ? prev.next = node : this._head = node };
            if (index < newnodes.length - 1) node.next = newnodes[index + 1];
            if (index === newnodes.length - 1) {
                node.next = nextAfterInsert;
                if (node.next === null) this._tail = node;
            }
            this._size++;
        });
    }

    iterator(value, success, fail) {
        let current = this._head;
        let i = 0;
        while (i < this._size) {
            if (value === current.value) return success === "index" ? i : success;
            current = current.next;
            i++;
        }
        return fail;
        //return an object with the options? hmmm
    }
}

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

const list = new linkedList;
list.prepend("origi head");
list.append("origi tail");
console.log(list);