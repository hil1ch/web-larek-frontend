import { IProduct } from "../../types/types";
import { EventEmitter } from "../base/events";

interface ICatalogModel {
    setProducts(items: IProduct[]): void;
    getProducts(): IProduct[];
}

export class CatalogModel implements ICatalogModel{
    items: IProduct[];
    _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
        this.items = [];
    }

    setProducts(items: IProduct[]) {
        this.items = items;
        this._events.emit('changeCatalogItems', this.items);
    }

    getProducts(): IProduct[] {
        return this.items;
    }
}