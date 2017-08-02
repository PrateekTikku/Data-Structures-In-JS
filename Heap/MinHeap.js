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
var Heap_1 = require("./Heap");
var MinHeap_Core = (function (_super) {
    __extends(MinHeap_Core, _super);
    function MinHeap_Core(comparator) {
        return _super.call(this, comparator) || this;
    }
    MinHeap_Core.prototype.heapify = function (index) {
        var minIndex = index;
        var leftIndex = Heap_1.Heap.Left(index);
        var rightIndex = Heap_1.Heap.Right(index);
        if (leftIndex <= this.heapSize && leftIndex >= 0 && this.compare(this.tasks[leftIndex].value, this.tasks[minIndex].value) < 0)
            minIndex = leftIndex;
        if (rightIndex <= this.heapSize && rightIndex >= 0 && this.compare(this.tasks[rightIndex].value, this.tasks[minIndex].value) < 0)
            minIndex = rightIndex;
        if (minIndex != index) {
            this.exchange(minIndex, index);
            this.heapify(minIndex);
        }
    };
    MinHeap_Core.prototype.insert = function (node) {
        this.tasks.push(node);
        this.heapSize = this.tasks.length - 1;
        var index = this.tasks.length - 1;
        var parentIndex = Heap_1.Heap.Parent(index);
        while (parentIndex >= 0 && this.compare(this.tasks[parentIndex].value, this.tasks[index].value) < 1) {
            this.exchange(index, parentIndex);
            index = parentIndex;
            parentIndex = Heap_1.Heap.Parent(index);
        }
    };
    MinHeap_Core.prototype.minimum = function () {
        return this.tasks[0];
    };
    MinHeap_Core.prototype.maximum = function () {
        var max = Math.floor(this.tasks.length / 2);
        var index = 0;
        for (index = max; index < this.tasks.length; index++) {
            if (this.compare(this.tasks[index].value, this.tasks[max].value) > 0)
                max = index;
        }
        return this.tasks[max];
    };
    return MinHeap_Core;
}(Heap_1.Heap));
exports.MinHeap_Core = MinHeap_Core;
var MinHeapNode = (function (_super) {
    __extends(MinHeapNode, _super);
    function MinHeapNode(data) {
        return _super.call(this, data) || this;
    }
    return MinHeapNode;
}(Heap_1.HeapNode));
exports.MinHeapNode = MinHeapNode;
//# sourceMappingURL=MinHeap.js.map