function BST_Node(data) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = data;
}

function BST_Insert(node) {
	var tree = this;
    var pointer = tree.root;
    var laggingPointer;

    while (pointer != null) {
        laggingPointer = pointer;
        if ( tree.compare(node.value, pointer.value) < 0 )
            pointer = pointer.left;
        else
            pointer = pointer.right;
    }
    node.parent = laggingPointer;
    if (laggingPointer == null)
        tree.root = node;
    else if ( tree.compare(node.value, laggingPointer.value) < 0 )
        laggingPointer.left = node;
    else
        laggingPointer.right = node;
}

function BST_PostOrderTreeWalk(node, processingFunction) {
    if (node != null) {
        BST_PostOrderTreeWalk.call(this, node.left, processingFunction);
        BST_PostOrderTreeWalk.call(this, node.right, processingFunction);
        processingFunction(node.value);
    }
}

function BST_PreOrderTreeWalk(node, processingFunction) {
    if (node != null) {
        processingFunction(node.value);
        BST_PreOrderTreeWalk.call(this, node.left, processingFunction);
        BST_PreOrderTreeWalk.call(this, node.right, processingFunction);
    }
}

function BST_InOrderTreeWalk(node, processingFunction) {
    if (node != null) {
        BST_InOrderTreeWalk.call(this, node.left, processingFunction);
        processingFunction(node.value);
        BST_InOrderTreeWalk.call(this, node.right, processingFunction);
    }
}

function BST_Search(pointer, value) {
	var tree = this;
	//console.log(pointer.value, value, tree.compare(value, pointer.value));
	if ( pointer === null || tree.compare(value, pointer.value) === 0 ){
		return pointer;
	}
	if( tree.compare(value, pointer.value) < 0)
		return BST_Search.call(tree, pointer.left, value);
	else
		return BST_Search.call(tree, pointer.right, value);
}

function BST_FindSuccessor(node){
	if( node.right )
		return BST_findMinimum(node.right);
	
	var parent = node.parent;
	while( parent && parent.right == node ){
		node = parent;
		parent = node.parent;
	}
	return parent;
}

function BST_FindPredecessor(node){
	if( node.left )
		return BST_findMaximum(node.left);
	
	var parent = node.parent;
	while( parent && parent.left == node ){
		node = parent;
		parent = node.parent;
	}
	return parent;
}

function BST_FindMinimum(node){
	while( node.left ){
		node = node.left;
	}
	return node;
}

function BST_FindMaximum(node){
	while( node.right ){
		node = node.right;
	}
	return node;
}

function BST_Delete(node){
	
}

module.exports = {
	BST_Node : BST_Node,
	BST_Insert : BST_Insert,
	BST_PostOrderTreeWalk : BST_PostOrderTreeWalk,
	BST_PreOrderTreeWalk : BST_PreOrderTreeWalk,
	BST_InOrderTreeWalk : BST_InOrderTreeWalk,
	BST_Search : BST_Search,
	BST_FindMinimum : BST_FindMinimum,
	BST_FindMaximum : BST_FindMaximum,
	BST_FindSuccessor : BST_FindSuccessor,
	BST_FindPredecessor : BST_FindPredecessor,
	BST_Delete : BST_Delete
}



