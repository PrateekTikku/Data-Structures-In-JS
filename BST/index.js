var implementation = require('./implementation');

module.exports = (function(comparator) {
    function BinarySearchTree() {
        this.root = null;
    }
    BinarySearchTree.prototype.compare = implementation.comparator || implementation.defaultComparator;
    BinarySearchTree.prototype.add = implementation.add;
    BinarySearchTree.prototype.processAllElements = implementation.processAllElements;
    BinarySearchTree.prototype.contains = implementation.contains;
    BinarySearchTree.prototype.findMin = implementation.findMin;
    BinarySearchTree.prototype.findMax = implementation.findMax;
	BinarySearchTree.prototype.hasNext = implementation.hasNext;
    BinarySearchTree.prototype.next = implementation.next;
	BinarySearchTree.prototype.hasPrevious = implementation.hasPrevious;
    BinarySearchTree.prototype.previous = implementation.previous;
    BinarySearchTree.prototype.remove = implementation.remove;

    return BinarySearchTree;
})();


//add bst.processAllElementsAfter(node, processingFunction, order)
//add bst.processNElementsAfter(node, N, processingFunction, order)