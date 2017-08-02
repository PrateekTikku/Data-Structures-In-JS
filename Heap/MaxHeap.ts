import {Iterable} from "../Interfaces/Iterators";
import {Heap, HeapNode} from "./Heap";

export class MaxHeap_Core extends Heap implements Iterable<MinHeapNode>{

    constructor(comparator?: Function) {
        super(comparator);
    }

    public heapify(index: number) {
        let minIndex: number = index;
        let leftIndex: number = Heap.Left(index);
        let rightIndex: number = Heap.Right(index);

        if (leftIndex <= this.heapSize && leftIndex >= 0 && this.compare(this.tasks[leftIndex].value, this.tasks[minIndex].value) < 0)
            minIndex = leftIndex;
        if (rightIndex <= this.heapSize && rightIndex >= 0 && this.compare(this.tasks[rightIndex].value, this.tasks[minIndex].value) < 0)
            minIndex = rightIndex;

        if (minIndex != index) {
            this.exchange(minIndex, index);
            this.heapify(minIndex);
        }
    }

    public insert(node: MinHeapNode): void {
        this.tasks.push(node);
        this.heapSize = this.tasks.length - 1;
        let index = this.tasks.length - 1;
        let parentIndex = Heap.Parent(index);

        while (parentIndex >= 0 && this.compare(this.tasks[parentIndex].value, this.tasks[index].value) > 1) {
            this.exchange(index, parentIndex);
            index = parentIndex;
            parentIndex = Heap.Parent(index);
        }
    }

    public maximum(): MinHeapNode {
        return this.tasks[0];
    }

    public minimum(): MinHeapNode {
        let max: number = Math.floor(this.tasks.length / 2);
        let index: number = 0;
        for (index = max; index < this.tasks.length; index++) {
            if (this.compare(this.tasks[index].value, this.tasks[max].value) < 0)
                max = index;
        }
        return this.tasks[max];
    }

}

class MinHeapNode extends HeapNode{
    constructor(data : Object){
        super(data);
    }
}