import {Iterable} from "../Interfaces/Iterators";
import * as Iterator from 'es6-iterator';

export abstract class Heap implements Iterable<HeapNode> {
    public compare: Function;
    public tasks: Array<HeapNode>;
    public heapSize: number;

    constructor(comparator?: Function) {
        this.compare = comparator || function (a, b) {
            if (a < b)
                return -1;
            else if (a === b)
                return 0;
            else if (a > b)
                return 1;
            else
                throw new Error('Please pass a comparator in the constructor, as the default comparator can only compare primitive values');
        };
        this.tasks = [];
        this.heapSize = -1;
    }

    public static Parent(index: number): number {
        return index % 2 > 0 ? Math.floor(index / 2) : Math.floor(index / 2) < 0 ? 0 : Math.floor(index / 2) - 1;
    }

    public static Left(index: number): number {
        return 2 * index + 1;
    }

    public static Right(index: number): number {
        return 2 * index + 2;
    }

    public exchange(i: number, j: number) {
        let temp: HeapNode = this.tasks[i];
        this.tasks[i] = this.tasks[j];
        this.tasks[j] = temp;
    }

    public * [Symbol.iterator](): Iterator<HeapNode> {
        try {
            while (this.heapSize >= 0) {
                yield this.extractRoot().value;
            }
        }
        finally {                                   //for early returns, breaks or errors
            this.heapSize = this.tasks.length - 1;
            this.buildHeap();
        }
    }

    public insertAll(nodes: Array<HeapNode>): void {
        let i: number = 0;
        nodes.forEach(node => this.tasks.push(node));
        this.heapSize = this.tasks.length - 1;
        this.buildHeap();
    }

    public remove(node: HeapNode): HeapNode {
        let nodeIndex = this.findNodeIndex(node);
        let removedElement = this.tasks[nodeIndex];
        this.exchange(nodeIndex, this.heapSize);
        this.heapSize--;
        if (this.heapSize == 0)
            this.tasks = [];
        else
            this.heapify(nodeIndex);

        this.tasks.pop();
        return removedElement;
    }

    public createNode(data: Object, other?: any): HeapNode {
        if (data instanceof HeapNode)
            return data;
        return new HeapNode(data);
    }

    public extractRoot(): HeapNode {
        let min = this.tasks[0];
        this.exchange(0, this.heapSize);
        this.heapSize--;
        this.heapify(0);
        return min;
    }

    public buildHeap(): void {
        let index: number;
        for (index = Math.floor((this.heapSize) / 2); index >= 0; index--) {
            this.heapify(index);
        }
    }

    public search(node: HeapNode): HeapNode {
        for (let index = 0; index < this.tasks.length; index++) {
            if (this.compare(this.tasks[index].value, node.value) == 0)
                return this.tasks[index];
        }
        return null;
    }

    public clear(): void {
        this.tasks = [];
        this.heapSize = -1;
    }

    public size(): number {
        return this.heapSize;
    }

    private findNodeIndex(node: HeapNode): number {
        for (let index = 0; index < this.tasks.length; index++) {
            if (this.compare(this.tasks[index].value, node.value) == 0)
                return index;
        }
    }

    public abstract heapify(index: number): Iterator<HeapNode>;

    public abstract minimum(): HeapNode;

    public abstract maximum(): HeapNode;

    public abstract insert(node: HeapNode, other?: any): void;

}

export class HeapNode {
    public value: Object;

    constructor(data: Object) {
        this.value = data;
    }
}