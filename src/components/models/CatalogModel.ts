import { IProduct } from "../../types/types";
import { EventEmitter, IEvents } from "../base/events";

interface ICatalogModel {
    items: IProduct[];
    setProducts(items: IProduct[]): void;
    getProduct(id: string): IProduct;
}

export class CatalogModel implements ICatalogModel{
    items: IProduct[] | null = null;
    protected _events: IEvents | null = null;

    constructor(events: EventEmitter) {
        this._events = events;
        this.items = [];
    }

    setProducts(items: IProduct[]): void {
        this.items = items;
        this._events.emit('changeCatalogItems', this.items);
    }

    getProduct(id: string): IProduct | undefined {
        return this.items.find((item: IProduct) => item.id === id)
    }
}