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
var BST_1 = require("./BST");
var RedBlackTree = (function (_super) {
    __extends(RedBlackTree, _super);
    function RedBlackTree(comparator) {
        var _this = _super.call(this, comparator) || this;
        _this.root = RedBlackTree.nil;
        return _this;
    }
    RedBlackTree.prototype.createNode = function (data) {
        if (data instanceof RedBlackTreeNode)
            return data;
        return new RedBlackTreeNode(data);
    };
    RedBlackTree.prototype.insert = function (node) {
        var pointer = this.root;
        var laggingPointer;
        while (pointer != RedBlackTree.nil) {
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
        this.insertFixUp(node);
    };
    ;
    RedBlackTree.prototype.leftRotate = function (node) {
        var parent = node.parent;
        var rightChild = node.right;
        node.right = rightChild.left;
        if (rightChild.left != RedBlackTree.nil)
            rightChild.left.parent = node;
        rightChild.parent = parent;
        if (parent == RedBlackTree.nil)
            this.root = rightChild;
        else if (parent.left == node)
            parent.left = rightChild;
        else
            parent.right = rightChild;
        rightChild.left = node;
        node.parent = rightChild;
    };
    RedBlackTree.prototype.rightRotate = function (node) {
        var parent = node.parent;
        var leftChild = node.left;
        node.left = leftChild.right;
        if (leftChild.right != RedBlackTree.nil)
            leftChild.right.parent = node;
        leftChild.parent = parent;
        if (parent == RedBlackTree.nil)
            this.root = leftChild;
        else if (parent.left == node)
            parent.left = leftChild;
        else
            parent.right = leftChild;
        leftChild.right = node;
        node.parent = leftChild;
    };
    RedBlackTree.prototype.insertFixUp = function (node) {
        while (node.parent && node.parent.color === 'RED') {
            if (node.parent.parent && node.parent == node.parent.parent.left) {
                var uncle = node.parent.parent.right;
                if (uncle && uncle.color == 'RED') {
                    node.color = 'BLACK';
                    uncle.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    node = node.parent.parent;
                }
                else {
                    if (node == node.parent.right) {
                        node = node.parent;
                        this.leftRotate(node);
                    }
                    node.parent.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    this.rightRotate(node.parent.parent);
                }
            }
            else if (node.parent.parent && node.parent == node.parent.parent.right) {
                var uncle = node.parent.parent.left;
                if (uncle && uncle.color == 'RED') {
                    node.color = 'BLACK';
                    uncle.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    node = node.parent.parent;
                }
                else {
                    if (node == node.parent.left) {
                        node = node.parent;
                        this.rightRotate(node);
                    }
                    node.parent.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    this.leftRotate(node.parent.parent);
                }
            }
            else {
                break;
            }
        }
        this.root.color = 'BLACK';
    };
    return RedBlackTree;
}(BST_1.BinarySearchTree));
RedBlackTree.nil = null;
exports.RedBlackTree = RedBlackTree;
var RedBlackTreeNode = (function (_super) {
    __extends(RedBlackTreeNode, _super);
    function RedBlackTreeNode(data) {
        var _this = _super.call(this, data) || this;
        _this.left = RedBlackTree.nil;
        _this.right = RedBlackTree.nil;
        _this.parent = RedBlackTree.nil;
        _this.color = 'RED';
        return _this;
    }
    return RedBlackTreeNode;
}(BST_1.BinarySearchTreeNode));
exports.RedBlackTreeNode = RedBlackTreeNode;
//# sourceMappingURL=RBTree.js.map