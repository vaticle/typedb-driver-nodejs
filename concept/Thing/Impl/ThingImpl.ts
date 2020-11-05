import { Thing, RemoteThing } from "../Thing";
import { AttributeValueType, Attribute } from "../Attribute";
import { Entity } from "../Entity";
import { Relation } from "../Relation";
import { Type, RemoteType } from "../../Type/Type";
import { ThingType } from "../../Type/ThingType";
import { QueryIterator } from "../../Concept";
import { AttributeType } from "../../Type/AttributeType";
import { RoleType } from "../../Type/RoleType";

export abstract class ThingImpl implements Thing {
    readonly iid: string;

    protected constructor (iid: string) {
        if (!iid) {
            throw "IID Missing"
        }
        this.iid = iid;
    }

    asAttribute(): Attribute<AttributeValueType> {
        throw "Invalid cast to Attribute";
    }

    asEntity(): Entity {
        throw "Invalid cast to Entity";
    }

    asRelation(): Relation {
        throw "Invalid cast to Relation"
    }

    asThing(): Thing {
        return this;
    }

    asType(): Type {
        throw "Invalid cast to Type";
    }

    getIID(): string {
        return this.iid;
    }

    isRemote(): boolean {
        return false;
    }

    abstract asRemote(transaction: Transaction): RemoteThing;
}

export abstract class RemoteThingImpl implements RemoteThing {
    readonly iid: string;
    private transaction: Transaction;

    protected constructor (transaction: Transaction, iid: string) {
        if (!transaction)   throw "Transaction Missing"
        if (!iid)           throw "IID Missing"
        this.iid = iid;
        this.transaction = transaction;
    }

    abstract getType(): ThingType;

    setHas(attribute: Attribute<AttributeValueType>): void {
        return undefined;
    }

    asAttribute(): Attribute<AttributeValueType> {
        throw "Invalid cast to Attribute";
    }

    asEntity(): Entity {
        throw "Invalid cast to Entity";
    }

    asRelation(): Relation {
        throw "Invalid cast to Relation"
    }

    abstract asRemote(transaction: Transaction): RemoteThing;

    asThing(): RemoteThing {
        return this;
    }

    asType(): RemoteType {
        throw "Invalid cast to Type";
    }

    delete(): void {
    }

    getIID(): string {
        return this.iid;
    }

    isDeleted(): boolean {
        return false;
    }

    isRemote(): boolean {
        return true;
    }

    getHas(onlyKey: boolean): QueryIterator;
    getHas(attributeType: Type): QueryIterator;
    getHas(attributeType: Type): QueryIterator;
    getHas(attributeType: Type): QueryIterator;
    getHas(attributeType: Type): QueryIterator;
    getHas(attributeType: Type): QueryIterator;
    getHas(attributeTypes: AttributeType[]): QueryIterator;
    getHas(onlyKey: boolean | Type | AttributeType[]): QueryIterator {
        return new QueryIterator();
    }

    getPlays(): QueryIterator {
        return new QueryIterator();
    }

    getRelations(roleTypes: RoleType[]): QueryIterator {
        return new QueryIterator();
    }

    isInferred(): boolean {
        return false;
    }

    unsetHas(attribute: Attribute<any>): void {
    }

}