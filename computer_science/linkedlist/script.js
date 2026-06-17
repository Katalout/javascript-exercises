class LinkedList {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
        this.length = 0;
    }
    append(value) {
        let node = new Node(value);
        //current tail's nextNode to be updated to this one
        //list's tail to be reassigned to this one
        this.length++;
    }

    prepend(value, next) {
        let node = new Node(value, next);
        //next is the previous head
        //list's head to be reassigned to this one
        this.length++;
    }
    size() {
        return this.length;
    }
}

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.nextNode = next;
    }
}