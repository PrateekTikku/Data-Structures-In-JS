"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MinHeap_1 = require("./MinHeap");
var Heap_1 = require("./Heap");
var PriorityQueue_Core = (function (_super) {
    __extends(PriorityQueue_Core, _super);
    function PriorityQueue_Core(comparator) {
        var _this = _super.call(this, comparator) || this;
        if (comparator)
            _this.useComparator = true;
        _this.priorityCounter = 0;
        return _this;
    }
    PriorityQueue_Core.prototype.createNode = function (data, customPriority) {
        if (data instanceof PriorityQueueNode)
            return data;
        if (customPriority && this.useComparator) {
            throw new Error('Cannot set priority : Comparator is being used to order the elements');
        }
        var node = new PriorityQueueNode(data, customPriority);
        if (!node.priority)
            node.priority = ++this.priorityCounter;
        return node;
    };
    PriorityQueue_Core.prototype.insert = function (node) {
        this.tasks.push(node);
        this.heapSize = this.tasks.length - 1;
        var index = this.tasks.length - 1;
        var parentIndex = Heap_1.Heap.Parent(index);
        while (parentIndex >= 0 && this.sendToComparator(this.tasks[parentIndex], this.tasks[index]) < 1) {
            this.exchange(index, parentIndex);
            index = parentIndex;
            parentIndex = Heap_1.Heap.Parent(index);
        }
    };
    PriorityQueue_Core.prototype.heapify = function (index) {
        var minIndex = index;
        var leftIndex = Heap_1.Heap.Left(index);
        var rightIndex = Heap_1.Heap.Right(index);
        if (leftIndex <= this.heapSize && leftIndex >= 0 && this.sendToComparator(this.tasks[leftIndex], this.tasks[minIndex]) > 0)
            minIndex = leftIndex;
        if (rightIndex <= this.heapSize && rightIndex >= 0 && this.sendToComparator(this.tasks[rightIndex], this.tasks[minIndex]) > 0)
            minIndex = rightIndex;
        // console.log(this.tasks[index],this.tasks[leftIndex], this.tasks[rightIndex],this.tasks[minIndex]);
        if (minIndex != index) {
            this.exchange(minIndex, index);
            this.heapify(minIndex);
        }
    };
    PriorityQueue_Core.prototype.maximum = function () {
        var max = Math.floor(this.tasks.length / 2);
        var index = 0;
        for (index = max; index < this.tasks.length; index++) {
            if (this.sendToComparator(this.tasks[index], this.tasks[max]) < 0)
                max = index;
        }
        return this.tasks[max];
    };
    PriorityQueue_Core.prototype.sendToComparator = function (a, b) {
        if (this.useComparator) {
            return this.compare(a.value, b.value);
        }
        return this.compare(a.priority, b.priority);
    };
    return PriorityQueue_Core;
}(MinHeap_1.MinHeap_Core));
exports.PriorityQueue_Core = PriorityQueue_Core;
var PriorityQueueNode = (function (_super) {
    __extends(PriorityQueueNode, _super);
    function PriorityQueueNode(data, priority) {
        var _this = _super.call(this, data) || this;
        _this.priority = priority;
        return _this;
    }
    return PriorityQueueNode;
}(MinHeap_1.MinHeapNode));
//# sourceMappingURL=Priority Queue.js.map