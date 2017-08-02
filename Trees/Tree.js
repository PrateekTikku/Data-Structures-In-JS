"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tree = (function () {
    function Tree(comparator) {
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
        this.root = null;
    }
    Tree.prototype.insertAll = function (nodes) {
        var _this = this;
        nodes.forEach(function (node) { return _this.insert(node); });
    };
    return Tree;
}());
exports.Tree = Tree;
var TreeNode = (function () {
    function TreeNode(data) {
        this.left = null;
        this.parent = null;
        this.right = null;
        this.value = data;
    }
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=Tree.js.map