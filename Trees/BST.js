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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tree_1 = require("./Tree");
var Symbol = require("es6-symbol");
var BinarySearchTree = (function (_super) {
    __extends(BinarySearchTree, _super);
    function BinarySearchTree(comparator) {
        var _this = _super.call(this, comparator) || this;
        _this.root = null;
        return _this;
    }
    BinarySearchTree.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(this.ascendingOrderTraversal())];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    };
    BinarySearchTree.prototype.descendingIterator = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(this.descendingOrderTraversal())];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    };
    BinarySearchTree.prototype.transplant = function (u, v) {
        if (u.parent == null)
            this.root = u;
        else if (u == u.parent.left)
            u.parent.left = v;
        else
            u.parent.right = v;
        if (v != null)
            v.parent = u.parent;
    };
    BinarySearchTree.prototype.createNode = function (data, other) {
        if (data instanceof BinarySearchTreeNode)
            return data;
        return new BinarySearchTreeNode(data);
    };
    BinarySearchTree.prototype.insert = function (node) {
        var pointer = this.root;
        var laggingPointer;
        while (pointer != null) {
            laggingPointer = pointer;
            if (this.compare(node.value, pointer.value) < 0)
                pointer = pointer.left;
            else
                pointer = pointer.right;
        }
        node.parent = laggingPointer;
        if (laggingPointer == null)
            this.root = node;
        else if (this.compare(node.value, laggingPointer.value) < 0)
            laggingPointer.left = node;
        else
            laggingPointer.right = node;
    };
    ;
    BinarySearchTree.prototype.search = function (node, pointer) {
        if (pointer === undefined)
            pointer = this.root;
        //console.log(node.value,'>>>',pointer.value);
        if (pointer === null || this.compare(node.value, pointer.value) === 0) {
            //console.log('Found' + pointer.value);
            return pointer;
        }
        if (this.compare(node.value, pointer.value) < 0)
            return this.search(node, pointer.left);
        else
            return this.search(node, pointer.right);
    };
    ;
    BinarySearchTree.prototype.maximum = function (node) {
        if (node === void 0) { node = this.root; }
        while (node.right) {
            node = node.right;
        }
        return node;
    };
    BinarySearchTree.prototype.minimum = function (node) {
        if (node === void 0) { node = this.root; }
        while (node.left) {
            node = node.left;
        }
        return node;
    };
    BinarySearchTree.prototype.successor = function (node) {
        if (node.right)
            return this.minimum(node.right);
        var parent = node.parent;
        while (parent && parent.right == node) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    };
    ;
    BinarySearchTree.prototype.predecessor = function (node) {
        if (node.left)
            return this.maximum(node.left);
        var parent = node.parent;
        while (parent && parent.left == node) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    };
    ;
    BinarySearchTree.prototype.remove = function (node) {
        var min;
        if (node.left == null)
            this.transplant(node, node.right);
        else if (node.right == null)
            this.transplant(node, node.left);
        else {
            min = this.minimum(node);
            if (min.parent != node) {
                this.transplant(min, min.right);
                min.right = node.right;
                min.right.parent = min;
            }
            this.transplant(node, min);
            min.left = node.left;
            min.left.parent = node.parent;
        }
        return node;
    };
    ;
    BinarySearchTree.prototype.ascendingOrderTraversal = function (node) {
        if (node === void 0) { node = this.root; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(node != null)) return [3 /*break*/, 4];
                    return [5 /*yield**/, __values(this.ascendingOrderTraversal(node.left))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, node.value];
                case 2:
                    _a.sent();
                    return [5 /*yield**/, __values(this.ascendingOrderTraversal(node.right))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    };
    BinarySearchTree.prototype.descendingOrderTraversal = function (node) {
        if (node === void 0) { node = this.root; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(node != null)) return [3 /*break*/, 4];
                    return [5 /*yield**/, __values(this.descendingOrderTraversal(node.right))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, node.value];
                case 2:
                    _a.sent();
                    return [5 /*yield**/, __values(this.descendingOrderTraversal(node.left))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    };
    return BinarySearchTree;
}(Tree_1.Tree));
BinarySearchTree.nil = null;
exports.BinarySearchTree = BinarySearchTree;
var BinarySearchTreeNode = (function (_super) {
    __extends(BinarySearchTreeNode, _super);
    function BinarySearchTreeNode(data) {
        return _super.call(this, data) || this;
    }
    return BinarySearchTreeNode;
}(Tree_1.TreeNode));
exports.BinarySearchTreeNode = BinarySearchTreeNode;
//# sourceMappingURL=BST.js.map