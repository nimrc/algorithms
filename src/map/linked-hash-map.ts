import HashMap from './hash-map';
import DoubleLinkedList, { DListNode } from '../list/double-linked-list';

class Iterator {
    private map: LinkedHashMap<any>;

    private iterator: DListNode<any>;

    constructor(map: LinkedHashMap<any>) {
        this.map = map;
        this.rewind();
    }

    rewind() {
        this.iterator = {
            value: null,
            prev : null,
            next : this.map.list.head
        } as DListNode<any>;
    }

    hasNext(): boolean {
        return this.iterator.next !== null;
    }

    next() {
        const next = this.iterator.next;
        this.iterator = next;

        return next.value;
    }
}

export default class LinkedHashMap<T> extends HashMap<DListNode<T>> {
    list: DoubleLinkedList<T>;

    constructor() {
        super();

        this.list = new DoubleLinkedList<T>();
    }

    iterator(): Iterator {
        return new Iterator(this);
    }

    /**
     * T = O(1)
     * */
    put(key: string, value: any) {
        this.list.pushBack(value);
        super.put(key, this.list.tail);
    }

    /**
     * T = O(1)
     * */
    get(key: string): any {
        const node = super.get(key);

        return node ? node.value : null;
    }


    /**
     * T = O(1)
     * */
    remove(key: string): void {
        this.list.removeAt(super.get(key));
        super.remove(key);
    }
}
