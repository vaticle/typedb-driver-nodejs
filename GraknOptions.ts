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

import {CreateGraknError} from "./_internal";

export class GraknOptions {
    private _infer: boolean;
    private _explain: boolean;
    private _batchSize: number;

    constructor() {
        this._infer = null;
        this._explain = null;
        this._batchSize = null;
    }

    infer(): boolean {
        return this._infer;
    }

    setInfer(infer: boolean): GraknOptions {
        this._infer = infer;
        return this;
    }

    explain(): boolean {
        return this._explain;
    }

    setExplain(explain: boolean): GraknOptions {
        this._explain = explain;
        return this;
    }

    batchSize(): number {
        return this._batchSize;
    }

    setBatchSize(batchSize: number): GraknOptions {
        if (batchSize < 1) {
            throw "Attempted to set nonpositive batch size."
        }
        this._batchSize = batchSize;
        return this;
    }
}
