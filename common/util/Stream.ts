/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {GraknClientError} from "../errors/GraknClientError";

export abstract class Stream<T> implements AsyncIterable<T> {

    constructor() { }

    // TODO why can't this abstract?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async* [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        throw new GraknClientError("ILLEGAL STATE"); // TODO better error
    }

    async collect(): Promise<T[]> {
        const answers: T[] = [];
        for await (const answer of this) {
            answers.push(answer);
        }
        return answers;
    }

    async every(callbackFn: (value: T) => unknown): Promise<boolean> {
        for await (const item of this) {
            if (!callbackFn(item)) return false;
        }
        return true;
    }

    async some(callbackFn: (value: T) => unknown): Promise<boolean> {
        for await (const item of this) {
            if (callbackFn(item)) return true;
        }
        return false;
    }

    filter(filter: (value: T) => boolean): Stream<T> {
        return new Stream.Filtered<T>(this, filter);
    }

    map<U>(mapper: (value: T) => U): Stream<U> {
        return new Stream.Mapped<T, U>(this, mapper);
    }

    flatMap<U>(mapper: (value: T) => Stream<U>): Stream<U> {
        return new Stream.FlatMapped<T, U, Stream<U>>(this, mapper);
    }

    async forEach(fn: (value: T) => void): Promise<void> {
        for await (const val of this) {
            fn(val);
        }
    }
}

export namespace Stream {

    export function iterable<T>(iterable: AsyncIterable<T>) {
        return new Iterable<T>(iterable);
    }

    export function array<T>(items: T[]) {
        return new Array<T>(items);
    }

    class Iterable<T> extends Stream<T> {

        private _provider: AsyncIterable<T>;

        public constructor(provider: AsyncIterable<T>) {
            super();
            this._provider = provider;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async* [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
            for await (const val of this._provider) {
                yield val;
            }
        }

    }

    class Array<T> extends Stream<T> {

        private _array: T[];

        public constructor(array: T[]) {
            super();
            this._array = array;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async* [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
            for await (const val of this._array) {
                yield val;
            }
        }

    }
    export class Filtered<T> extends Stream<T> {

        private _filter: (value: T) => boolean;
        private _source: Stream<T>;

        constructor(source: Stream<T>, filter: (value: T) => boolean) {
            super();
            this._source = source;
            this._filter = filter;

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async* [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
            for await (const val of this._source) {
                if (this._filter(val)) yield val;
            }
        }

    }

    export class Mapped<T, U> extends Stream<U> {

        private _source: Stream<T>;
        private _mapper: (value: T) => U;

        constructor(source: Stream<T>, mapper: (value: T) => U) {
            super();
            this._source = source;
            this._mapper = mapper;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async* [Symbol.asyncIterator](): AsyncIterator<U, any, undefined> {
            for await (const val of this._source) {
                yield this._mapper(val);
            }
        }

    }

    export class FlatMapped<T, U, S extends Stream<U>> extends Stream<U> {
        private _source: Stream<T>;
        private _flatMapper: (value: T) => Stream<U>;

        constructor(source: Stream<T>, flatMapper: (value: T) => Stream<U>) {
            super();
            this._source = source;
            this._flatMapper = flatMapper;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async* [Symbol.asyncIterator](): AsyncIterator<U, any, undefined> {
            for await (const val of this._source) {
                for await (const flatMapped of this._flatMapper(val)) {
                    yield flatMapped;
                }
            }
        }

    }


}