'use strict';

class ListNode {
    constructor(value) {
        this.value = value;

        this.next = null;
    }
}

export default class LinkedList {
    constructor(args) {
        this.head = null;

        this.tail = null;

        this.length = 0;

        if (args && args.length > 0)
            args.map(value => this.pushBack(value));
    }

    /**
     * T = O(1)
     * */
    pushFront(value) {
        let node = new ListNode(value);

        node.next = this.head;
        this.head = node;

        if (this.length === 0)
            this.tail = node;

        this.length++;
    }

    /**
     * T = O(1)
     * */
    pushBack(value) {
        let node = new ListNode(value);

        if (this.length === 0)
            this.head = node;
        else
            this.tail.next = node;

        this.tail = node;

        this.length++;
    }

    /**
     * T = O(1)
     * */
    popFront() {
        if (this.length === 0)
            return null;

        let node  = this.head;
        this.head = this.head.next;
        this.length--;

        return node.value;
    }

    /**
     * T = O(n)
     * */
    popBack() {
        if (this.length === 0)
            return null;

        let next = this.head;
        let tail = this.tail;

        while (next.next && next.next.next) {
            next = next.next;
        }

        if (next === tail)
            this.tail = null;
        else
            this.tail = next;

        next.next = null;
        this.length--;

        return tail.value;
    }

    /**
     * T = O(1)
     * */
    isEmpty() {
        return this.length === 0;
    }
}
