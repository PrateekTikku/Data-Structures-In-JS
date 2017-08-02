import {Iterable} from "../Interfaces/Iterators";
import * as Iterator from 'es6-iterator';

export abstract class Tree implements Iterable<TreeNode> {

    private size: Number;
    public compare: Function;
    public root: TreeNode;

    constructor(comparator?: Function) {
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

    public abstract [Symbol.iterator](): Iterator<TreeNode>;

    public abstract descendingIterator(): Iterator<TreeNode>;

    public abstract createNode(data, other?): TreeNode;

    public abstract insert(node: TreeNode): void;

    public insertAll(nodes: Array<TreeNode>): void {
        nodes.forEach(node => this.insert(node));
    }

    public abstract search(node: TreeNode): TreeNode;

    public abstract minimum(node: TreeNode): TreeNode;

    public abstract maximum(node: TreeNode): TreeNode;

    public abstract successor(node: TreeNode): TreeNode;

    public abstract predecessor(node: TreeNode): TreeNode;

    public abstract remove(node: TreeNode): TreeNode;

}

export class TreeNode {
    public left: TreeNode;
    public right: TreeNode;
    public parent: TreeNode;
    public value: Object;

    constructor(data: Object) {
        this.left = null;
        this.parent = null;
        this.right = null;
        this.value = data;
    }
}
