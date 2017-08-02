import {BinarySearchTree, BinarySearchTreeNode} from "./BST";

export class RedBlackTree extends BinarySearchTree {
    public root: RedBlackTreeNode;
    public static nil = null;

    constructor(comparator?: Function) {
        super(comparator);
        this.root = RedBlackTree.nil;
    }

    public createNode(data: Object): RedBlackTreeNode {
        if (data instanceof RedBlackTreeNode)
            return data;
        return new RedBlackTreeNode(data);
    }

    public insert(node : RedBlackTreeNode): void {
        let pointer = this.root;
        let laggingPointer;

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

    private leftRotate(node: RedBlackTreeNode): void {
        let parent = node.parent;
        let rightChild = node.right;

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
    }

    private rightRotate(node: RedBlackTreeNode): void {
        let parent = node.parent;
        let leftChild = node.left;

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
    }

    private insertFixUp(node: RedBlackTreeNode): void {
        while (node.parent && node.parent.color === 'RED') {
            if (node.parent.parent && node.parent == node.parent.parent.left) {
                let uncle = node.parent.parent.right;
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
                let uncle = node.parent.parent.left;
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
    }
}

export class RedBlackTreeNode extends BinarySearchTreeNode {
    public color: String;
    public parent: RedBlackTreeNode;
    public left: RedBlackTreeNode;
    public right: RedBlackTreeNode;

    constructor(data: Object) {
        super(data);
        this.left = RedBlackTree.nil;
        this.right = RedBlackTree.nil;
        this.parent = RedBlackTree.nil;
        this.color = 'RED';
    }
}