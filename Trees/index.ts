import {Tree} from "./Tree";
import {RedBlackTree} from "./RBTree";
import {Iterable} from "../Interfaces/Iterators";
import * as Symbol from 'es6-symbol';
import * as Iterator from 'es6-iterator';

class TreeService implements Iterable<Object> {
    private treeImplementaion: Tree;

    constructor(ref: Tree) {
        this.treeImplementaion = ref;
    }

    public iterator(): Iterator<Object> {
        return this.treeImplementaion[Symbol.iterator]();
    }

    public descendingIterator(): Iterator<Object> {
        return this.treeImplementaion.descendingIterator();
    }

    public [Symbol.iterator](): Iterator<Object> {
        return this.treeImplementaion[Symbol.iterator]();
    }

    public add(data: any, other : any): void {
        if(data){
            let node = this.treeImplementaion.createNode(data, other);
            this.treeImplementaion.insert(node);
        }
        else{
            throw new Error(`You must pass an argument to function 'add'`);
        }
    }

    public addAll(elements : Array<any>):void{
        elements = elements.map(data=>this.treeImplementaion.createNode(data));
        this.treeImplementaion.insertAll(elements);
    }

    public contains(data: Object): boolean {
        let node = this.treeImplementaion.createNode(data);
        return !!this.treeImplementaion.search(node);
    }

    public min(data?: Object): Object {
        let node, min;
        if (data) {
            node = this.treeImplementaion.createNode(data);
        }
        else {
            node = this.treeImplementaion.root;
        }
        min = this.treeImplementaion.minimum(node);
        return min.value;
    }

    public max(data?: Object): Object {
        let node, max;
        if (data) {
            node = this.treeImplementaion.createNode(data);
        }
        else {
            node = this.treeImplementaion.root;
        }
        max = this.treeImplementaion.maximum(node);
        return max.value;
    }

    public remove(data: Object): Object {
        let node;
        if (data) {
            node = this.treeImplementaion.search(this.treeImplementaion.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            return this.treeImplementaion.remove(node).value;
        }
        throw new Error('You must pass valid argument to function "remove"');
    }

    public ceil(data: Object): Object {
        let node, next;
        if (data) {
            node = this.treeImplementaion.search(this.treeImplementaion.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            next = this.treeImplementaion.successor(node);
            return next ? next.value : null;
        }
        throw new Error('You must pass valid argument to function "ceil"');
    }

    public floor(data: Object): Object {
        let node, previous;
        if (data) {
            node = this.treeImplementaion.search(this.treeImplementaion.createNode(data));
            if (!node) {
                throw new Error('The node with value ' + data + ' is not yet present in the BST');
            }
            previous = this.treeImplementaion.predecessor(node);
            return previous ? previous.value : null;
        }
        throw new Error('You must pass valid argument to function "floor"');
    }
}

export class BST {
    public constructor(comparator?: Function) {
        let tree = new RedBlackTree(comparator);
        return new TreeService(tree);
    }
}