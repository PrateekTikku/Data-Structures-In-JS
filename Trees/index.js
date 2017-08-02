"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RBTree_1 = require("./RBTree");
var Symbol = require("es6-symbol");
var TreeService = (function () {
    function TreeService(ref) {
        this.treeImplementaion = ref;
    }
    TreeService.prototype.iterator = function () {
        return this.treeImplementaion[Symbol.iterator]();
    };
    TreeService.prototype.descendingIterator = function () {
        return this.treeImplementaion.descendingIterator();
    };
    TreeService.prototype[Symbol.iterator] = function () {
        return this.treeImplementaion[Symbol.iterator]();
    };
    TreeService.prototype.add = function (data, other) {
        if (data) {
            var node = this.treeImplementaion.createNode(data, other);
            this.treeImplementaion.insert(node);
        }
        else {
            throw new Error("You must pass an argument to function 'add'");
        }
    };
    TreeService.prototype.addAll = function (elements) {
        var _this = this;
        elements = elements.map(function (data) { return _this.treeImplementaion.createNode(data); });
        this.treeImplementaion.insertAll(elements);
    };
    TreeService.prototype.contains = function (data) {
        var node = this.treeImplementaion.createNode(data);
        return !!this.treeImplementaion.search(node);
    };
    TreeService.prototype.min = function (data) {
        var node, min;
        if (data) {
            node = this.treeImplementaion.createNode(data);
        }
        else {
            node = this.treeImplementaion.root;
        }
        min = this.treeImplementaion.minimum(node);
        return min.value;
    };
    TreeService.prototype.max = function (data) {
        var node, max;
        if (data) {
            node = this.treeImplementaion.createNode(data);
        }
        else {
            node = this.treeImplementaion.root;
        }
        max = this.treeImplementaion.maximum(node);
        return max.value;
    };
    TreeService.prototype.remove = function (data) {
        var node;
        if (data) {
            node = this.treeImplementaion.search(this.treeImplementaion.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            return this.treeImplementaion.remove(node).value;
        }
        throw new Error('You must pass valid argument to function "remove"');
    };
    TreeService.prototype.ceil = function (data) {
        var node, next;
        if (data) {
            node = this.treeImplementaion.search(this.treeImplementaion.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            next = this.treeImplementaion.successor(node);
            return next ? next.value : null;
        }
        throw new Error('You must pass valid argument to function "ceil"');
    };
    TreeService.prototype.floor = function (data) {
        var node, previous;
        if (data) {
            node = this.treeImplementaion.search(this.treeImplementaion.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            previous = this.treeImplementaion.predecessor(node);
            return previous ? previous.value : null;
        }
        throw new Error('You must pass valid argument to function "floor"');
    };
    return TreeService;
}());
var BST = (function () {
    function BST(comparator) {
        var tree = new RBTree_1.RedBlackTree(comparator);
        return new TreeService(tree);
    }
    return BST;
}());
exports.BST = BST;
//# sourceMappingURL=index.js.map