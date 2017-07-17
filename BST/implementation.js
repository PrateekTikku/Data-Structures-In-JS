var core = require('./core');

function processAllElements(processingFunction, order) {
	var tree = this;
    if (order)
        order = order.toString().toLowerCase();

    switch (order) {
        case 'pre':
        case '1':
            core.BST_PreOrderTreeWalk.call(tree, tree.root, processingFunction);
            break;
        case 'post':
        case '2':
            core.BST_PostOrderTreeWalk.call(tree, tree.root, processingFunction);
            break;
        default:
            core.BST_InOrderTreeWalk.call(tree, tree.root, processingFunction);
            break;
    }
}

function contains(data){
	var tree = this;
	var node = new core.BST_Node(data);
	var isPresent = core.BST_Search.call(this, tree.root, node) ? true : false;
	return isPresent;
}

function add(data) {
    var node = new core.BST_Node(data);
    var tree = this;
    core.BST_Insert.call(tree, node);
}

function findMin(data){
	var tree = this;
	var node, min;
	
	if( data ){
		node = core.BST_Search.call(this,tree.root, data);
		min = core.BST_FindMinimum(node);
	}
	else{
		min = core.BST_FindMinimum(tree.root);
	}
	return min.value;
}

function findMax(data){
	var tree = this;
	var node, max;
	
	if( data ){
		node = core.BST_Search.call(this,tree.root, data);
		max = core.BST_FindMaximum(node);
	}
	else{
		max = core.BST_FindMaximum(tree.root);
	}
	return max.value;
}

function hasNext(data){
	var tree = this, node;
	if ( data ){
		node = core.BST_Search.call(this, tree.root, data);
		if( !node ){
			throw new Error('The node with value ' + data + ' is not yet present in the BST');
		}	
		return core.BST_FindSuccessor.call(this, node) ? true : false;
	}
	throw new Error('You must pass valid argument to function "hasNext"');
}

function next(data){
	var tree = this, node;
	if ( data ){
		node = core.BST_Search.call(this, tree.root, data);
		if( !node ){
			throw new Error('The node with value ' + data + ' is not yet present in the BST');
		}	
		return core.BST_FindSuccessor.call(this, node) ? core.BST_FindSuccessor.call(this, node).value : null;
	}
	throw new Error('You must pass valid argument to function "next"');
}

function hasPrevious(data){
	var tree = this, node;
	if ( data ){
		node = core.BST_Search.call(this, tree.root, data);
		if( !node ){
			throw new Error('The node with value ' + data + ' is not yet present in the BST');
		}	
		return core.BST_FindPredecessor.call(this, node) ? true : false;
	}
	throw new Error('You must pass valid argument to function "hasPrevious"');
}

function previous(data){
	var tree = this, node;
	if ( data ){
		node = core.BST_Search.call(this, tree.root, data);
		if( !node ){
			throw new Error('The node with value ' + data + ' is not yet present in the BST');
		}	
		return core.BST_FindPredecessor.call(this, node) ? core.BST_FindPredecessor.call(this, node).value : null;
	}
	throw new Error('You must pass valid argument to function "previous"');
}

function defaultComparator(a, b) {
    if (a < b)
        return -1;
	else if ( a === b )
		return 0;
    return 1;
}

function remove(data){
	var tree = this, node;
	if ( data ){
		node = core.BST_Search.call(this, tree.root, data);
		if( !node ){
			throw new Error('The node with value ' + data + ' is not yet present in the BST');
		}	
		return core.BST_Delete.call(this, node);
	}
	throw new Error('You must pass valid argument to function "next"');
}

module.exports = {
	processAllElements : processAllElements,
	contains : contains,
	add : add,
	findMin : findMin,
	findMax : findMax,
	hasNext : hasNext,
	next : next,
	hasPrevious : hasPrevious,
	previous : previous,
	defaultComparator : defaultComparator,
	remove : remove
	
}