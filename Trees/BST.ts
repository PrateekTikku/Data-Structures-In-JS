import {Tree, TreeNode} from "./Tree";
import * as Symbol from 'es6-symbol';
import * as Iterator from 'es6-iterator';

export class BinarySearchTree extends Tree {
    public root: BinarySearchTreeNode;
    public static nil = null;

    constructor(comparator?: Function) {
        super(comparator);
        this.root = null;
    }

    public * [Symbol.iterator](): Iterator<BinarySearchTreeNode> {
        return yield* this.ascendingOrderTraversal();
    }

    public * descendingIterator(): Iterator<BinarySearchTreeNode> {
        return yield* this.descendingOrderTraversal();
    }

    private transplant(u: BinarySearchTreeNode, v: BinarySearchTreeNode): void {
        if (u.parent == null)
            this.root = u;
        else if (u == u.parent.left)
            u.parent.left = v;
        else
            u.parent.right = v;

        if (v != null)
            v.parent = u.parent;
    }

    public createNode(data: Object, other? : any): BinarySearchTreeNode {
        if (data instanceof BinarySearchTreeNode)
            return data;
        return new BinarySearchTreeNode(data);
    }

    public insert(node: BinarySearchTreeNode): void {
        let pointer = this.root;
        let laggingPointer;

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

    public search(node: BinarySearchTreeNode, pointer?: BinarySearchTreeNode): BinarySearchTreeNode {
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

    public maximum(node: TreeNode = this.root): TreeNode {
        while (node.right) {
            node = node.right;
        }
        return node;
    }

    public minimum(node: TreeNode = this.root): TreeNode {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    public successor(node: BinarySearchTreeNode): BinarySearchTreeNode {
        if (node.right)
            return this.minimum(node.right);

        let parent = node.parent;
        while (parent && parent.right == node) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    };

    public predecessor(node: BinarySearchTreeNode): BinarySearchTreeNode {
        if (node.left)
            return this.maximum(node.left);

        let parent = node.parent;
        while (parent && parent.left == node) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    };

    public remove(node: BinarySearchTreeNode): BinarySearchTreeNode {
        let min;

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

    public * ascendingOrderTraversal(node: BinarySearchTreeNode = this.root) {
        if (node != null) {
            yield* this.ascendingOrderTraversal(node.left);
            yield node.value;
            yield* this.ascendingOrderTraversal(node.right);
        }
    }

    public * descendingOrderTraversal(node: BinarySearchTreeNode = this.root) {
        if (node != null) {
            yield* this.descendingOrderTraversal(node.right);
            yield node.value;
            yield* this.descendingOrderTraversal(node.left);
        }
    }
}

export class BinarySearchTreeNode extends TreeNode {
    constructor(data: Object) {
        super(data);
    }
}