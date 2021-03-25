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

import {GraknOptions} from "../GraknOptions";
import {Stream} from "../../common/util/Stream";
import {ConceptMap} from "../answer/ConceptMap";
import {Numeric} from "../answer/Numeric";
import {ConceptMapGroup} from "../answer/ConceptMapGroup";
import {NumericGroup} from "../answer/NumericGroup";

export interface QueryManager {

    match(query: string, options?: GraknOptions): Stream<ConceptMap>;

    matchAggregate(query: string, options?: GraknOptions): Promise<Numeric>;

    matchGroup(query: string, options?: GraknOptions): Stream<ConceptMapGroup>;

    matchGroupAggregate(query: string, options?: GraknOptions): Stream<NumericGroup>;

    insert(query: string, options?: GraknOptions): Stream<ConceptMap>;

    delete(query: string, options?: GraknOptions): Promise<void>;

    update(query: string, options?: GraknOptions): Stream<ConceptMap>;

    define(query: string, options?: GraknOptions): Promise<void>;

    undefine(query: string, options?: GraknOptions): Promise<void>;

    // TODO
    // explain(query: string, options?: GraknOptions): Stream<Explanation>;

}