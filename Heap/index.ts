import {MinHeap_Core} from "./MinHeap";
import {MaxHeap_Core} from "./MaxHeap";
import {PriorityQueue_Core} from "./Priority Queue";
import {Heap} from "./Heap";

class HeapService implements Iterable<Object> {
    private heapImplementation: Heap;

    constructor(ref: Heap) {
        this.heapImplementation = ref;
    }

    public iterator(): Iterator<Object> {
        return this.heapImplementation[Symbol.iterator]();
    }

    public [Symbol.iterator](): Iterator<Object> {
        return this.heapImplementation[Symbol.iterator]();
    }

    public add(data: any, other?: any): void {
        if (data) {
            let node = this.heapImplementation.createNode(data, other);
            this.heapImplementation.insert(node);
        }
        else {
            throw new Error(`You must pass an argument to function 'add'`);
        }
    }

    public addAll(elements: Array<any>): void {
        elements = elements.map(data => this.heapImplementation.createNode(data));
        this.heapImplementation.insertAll(elements);
    }

    public contains(data: Object): boolean {
        let node = this.heapImplementation.createNode(data);
        return !!this.heapImplementation.search(node);
    }

    public peek(): Object {
        return this.heapImplementation.minimum().value;
    }

    public peekLast(): Object {
        return this.heapImplementation.maximum().value;
    }

    public remove(data: Object): Object {
        let node;
        if (data) {
            node = this.heapImplementation.search(this.heapImplementation.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            return this.heapImplementation.remove(node).value;
        }
        throw new Error('You must pass valid argument to function "remove"');
    }

    public clear(): void {
        this.heapImplementation.clear();
    }

    public size(): number {
        return this.heapImplementation.size();
    }
}

export class MinHeap {
    public constructor(comparator?: Function) {
        let heap = new MinHeap_Core(comparator);
        return new HeapService(heap);
    }
}

export class MaxHeap {
    public constructor(comparator?: Function) {
        let heap = new MaxHeap_Core(comparator);
        return new HeapService(heap);
    }
}

export class PriorityQueue {
    public constructor(comparator?: Function) {
        let heap = new PriorityQueue_Core(comparator);
        return new HeapService(heap);
    }
}