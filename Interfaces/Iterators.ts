import * as Symbol from 'es6-symbol';

export interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;

    descendingIterator?(): Iterator<T>;
}

export interface Iterator<T> {
    next(done: boolean, value?: any): IteratorResult<T>;

    return?(value?: any): IteratorResult<T>;

    throw?(e?: any): IteratorResult<T>;
}

export interface IteratorResult<T> {
    done: boolean;
    value: T;
}