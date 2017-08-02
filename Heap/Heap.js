"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Heap = (function () {
    function Heap(comparator) {
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
    Heap.Parent = function (index) {
        return index % 2 > 0 ? Math.floor(index / 2) : Math.floor(index / 2) < 0 ? 0 : Math.floor(index / 2) - 1;
    };
    Heap.Left = function (index) {
        return 2 * index + 1;
    };
    Heap.Right = function (index) {
        return 2 * index + 2;
    };
    Heap.prototype.exchange = function (i, j) {
        var temp = this.tasks[i];
        this.tasks[i] = this.tasks[j];
        this.tasks[j] = temp;
    };
    Heap.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 4, 5]);
                    _a.label = 1;
                case 1:
                    if (!(this.heapSize >= 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.extractRoot().value];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [3 /*break*/, 5];
                case 4:
                    this.heapSize = this.tasks.length - 1;
                    this.buildHeap();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    };
    Heap.prototype.insertAll = function (nodes) {
        var _this = this;
        var i = 0;
        nodes.forEach(function (node) { return _this.tasks.push(node); });
        this.heapSize = this.tasks.length - 1;
        this.buildHeap();
    };
    Heap.prototype.remove = function (node) {
        var nodeIndex = this.findNodeIndex(node);
        var removedElement = this.tasks[nodeIndex];
        this.exchange(nodeIndex, this.heapSize);
        this.heapSize--;
        if (this.heapSize == 0)
            this.tasks = [];
        else
            this.heapify(nodeIndex);
        this.tasks.pop();
        return removedElement;
    };
    Heap.prototype.createNode = function (data, other) {
        if (data instanceof HeapNode)
            return data;
        return new HeapNode(data);
    };
    Heap.prototype.extractRoot = function () {
        var min = this.tasks[0];
        this.exchange(0, this.heapSize);
        this.heapSize--;
        this.heapify(0);
        return min;
    };
    Heap.prototype.buildHeap = function () {
        var index;
        for (index = Math.floor((this.heapSize) / 2); index >= 0; index--) {
            this.heapify(index);
        }
    };
    Heap.prototype.search = function (node) {
        for (var index = 0; index < this.tasks.length; index++) {
            if (this.compare(this.tasks[index].value, node.value) == 0)
                return this.tasks[index];
        }
        return null;
    };
    Heap.prototype.clear = function () {
        this.tasks = [];
        this.heapSize = -1;
    };
    Heap.prototype.size = function () {
        return this.heapSize;
    };
    Heap.prototype.findNodeIndex = function (node) {
        for (var index = 0; index < this.tasks.length; index++) {
            if (this.compare(this.tasks[index].value, node.value) == 0)
                return index;
        }
    };
    return Heap;
}());
exports.Heap = Heap;
var HeapNode = (function () {
    function HeapNode(data) {
        this.value = data;
    }
    return HeapNode;
}());
exports.HeapNode = HeapNode;
//# sourceMappingURL=Heap.js.map