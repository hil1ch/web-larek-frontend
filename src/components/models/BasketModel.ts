import { EventEmitter } from '../base/events';
import { IProduct } from '../../types/types';

interface IBasketModel {
	add(item: IProduct): void; // метод добавления товара по его идентификатору
	remove(item: IProduct): void; // метод удаления товара по его идентификатору
	getItemsCount(): number; // Количество товаров в корзине
   getItems(): IProduct[]; // получение всех товаров
	clear(): void; //Очистка всей корзины
}

export class BasketModel implements IBasketModel {
    _events: EventEmitter | null = null;
    items: IProduct[] = [];

    constructor(events: EventEmitter) {
        this._events = events;
    }

    add(item: IProduct) {
        this.items.push(item);
    }

    getItemsCount() {
        return this.items.length;
    }

    remove(item: IProduct): void {
		this.items.forEach((product, id) => {
			 if (product.id === item.id) {
				  this.items.splice(id, 1);
				  item.isInBasket = false;
			 }
		});
		this._events.emit('renderBasket', this.items);
  }

    clear() {
        this.items.forEach((item) => item.isInBasket = false);
        this.items = [];
    }

    getItems() {
        return this.items; 
    }
}
