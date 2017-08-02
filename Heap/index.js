"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MinHeap_1 = require("./MinHeap");
var MaxHeap_1 = require("./MaxHeap");
var Priority_Queue_1 = require("./Priority Queue");
var HeapService = (function () {
    function HeapService(ref) {
        this.heapImplementation = ref;
    }
    HeapService.prototype.iterator = function () {
        return this.heapImplementation[Symbol.iterator]();
    };
    HeapService.prototype[Symbol.iterator] = function () {
        return this.heapImplementation[Symbol.iterator]();
    };
    HeapService.prototype.add = function (data, other) {
        if (data) {
            var node = this.heapImplementation.createNode(data, other);
            this.heapImplementation.insert(node);
        }
        else {
            throw new Error("You must pass an argument to function 'add'");
        }
    };
    HeapService.prototype.addAll = function (elements) {
        var _this = this;
        elements = elements.map(function (data) { return _this.heapImplementation.createNode(data); });
        this.heapImplementation.insertAll(elements);
    };
    HeapService.prototype.contains = function (data) {
        var node = this.heapImplementation.createNode(data);
        return !!this.heapImplementation.search(node);
    };
    HeapService.prototype.peek = function () {
        return this.heapImplementation.minimum().value;
    };
    HeapService.prototype.peekLast = function () {
        return this.heapImplementation.maximum().value;
    };
    HeapService.prototype.remove = function (data) {
        var node;
        if (data) {
            node = this.heapImplementation.search(this.heapImplementation.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            return this.heapImplementation.remove(node).value;
        }
        throw new Error('You must pass valid argument to function "remove"');
    };
    HeapService.prototype.clear = function () {
        this.heapImplementation.clear();
    };
    HeapService.prototype.size = function () {
        return this.heapImplementation.size();
    };
    return HeapService;
}());
var MinHeap = (function () {
    function MinHeap(comparator) {
        var heap = new MinHeap_1.MinHeap_Core(comparator);
        return new HeapService(heap);
    }
    return MinHeap;
}());
exports.MinHeap = MinHeap;
var MaxHeap = (function () {
    function MaxHeap(comparator) {
        var heap = new MaxHeap_1.MaxHeap_Core(comparator);
        return new HeapService(heap);
    }
    return MaxHeap;
}());
exports.MaxHeap = MaxHeap;
var PriorityQueue = (function () {
    function PriorityQueue(comparator) {
        var heap = new Priority_Queue_1.PriorityQueue_Core(comparator);
        return new HeapService(heap);
    }
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=index.js.map