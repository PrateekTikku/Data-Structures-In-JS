import {MinHeap_Core, MinHeapNode} from "./MinHeap";
import {Heap} from "./Heap";

export class PriorityQueue_Core extends MinHeap_Core {
    private priorityCounter: number;
    private useComparator: boolean;
    public tasks: Array<PriorityQueueNode>;

    constructor(comparator?: Function) {
        super(comparator);
        if (comparator)
            this.useComparator = true;
        this.priorityCounter = 0;
    }

    public createNode(data: Object, customPriority?: any): PriorityQueueNode {
        if (data instanceof PriorityQueueNode)
            return data;
        if (customPriority && this.useComparator) {
            throw new Error('Cannot set priority : Comparator is being used to order the elements');
        }
        let node = new PriorityQueueNode(data, customPriority);
        if (!node.priority)
            node.priority = ++this.priorityCounter;
        return node;
    }

    public insert(node: PriorityQueueNode): void {
        this.tasks.push(node);
        this.heapSize = this.tasks.length - 1;
        let index: number = this.tasks.length - 1;
        let parentIndex: number = Heap.Parent(index);

        while (parentIndex >= 0 && this.sendToComparator(this.tasks[parentIndex], this.tasks[index]) < 1) {
            this.exchange(index, parentIndex);
            index = parentIndex;
            parentIndex = Heap.Parent(index);
        }
    }

    public heapify(index: number): void {
        let minIndex: number = index;
        let leftIndex: number = Heap.Left(index);
        let rightIndex: number = Heap.Right(index);

        if (leftIndex <= this.heapSize && leftIndex >= 0 && this.sendToComparator(this.tasks[leftIndex], this.tasks[minIndex]) > 0)
            minIndex = leftIndex;
        if (rightIndex <= this.heapSize && rightIndex >= 0 && this.sendToComparator(this.tasks[rightIndex], this.tasks[minIndex]) > 0)
            minIndex = rightIndex;

        // console.log(this.tasks[index],this.tasks[leftIndex], this.tasks[rightIndex],this.tasks[minIndex]);

        if (minIndex != index) {
            this.exchange(minIndex, index);
            this.heapify(minIndex);
        }
    }

    public maximum(): PriorityQueueNode {
        let max: number = Math.floor(this.tasks.length / 2);
        let index: number = 0;
        for (index = max; index < this.tasks.length; index++) {
            if (this.sendToComparator(this.tasks[index], this.tasks[max]) < 0)
                max = index;
        }
        return this.tasks[max];
    }

    private sendToComparator(a: PriorityQueueNode, b: PriorityQueueNode): number {
        if (this.useComparator) {
            return this.compare(a.value, b.value);
        }
        return this.compare(a.priority, b.priority);
    }
}

class PriorityQueueNode extends MinHeapNode {
    public priority: number;

    constructor(data: Object, priority?: number) {
        super(data);
        this.priority = priority;
    }
}