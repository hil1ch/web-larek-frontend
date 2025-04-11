import { EventEmitter } from '../base/events';
import { IBasketItem, IProduct } from '../../types/types';

interface IBasketModel {
	items: Map<string, IBasketItem>; // список товаров
	add(item: IBasketItem): void; // метод добавления товара по его идентификатору
	remove(item: IProduct): void; // метод удаления товара по его идентификатору
	getTotal(items: IProduct[]): number; // общая сумма в корзине
	getItemsCount(): number; // Количество товаров в корзине
   getItems(): Map<string, IBasketItem>; // получение всех товаров
}

export class BasketModel implements IBasketModel {
	items: Map<string, IBasketItem> = new Map();
	_events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	add(item: IBasketItem): void {
		if (!this.items.has(item.id)) {
			this.items.set(item.id, item);
		}
	}

	remove(item: IProduct): void {
		if (!this.items.has(item.id)) return; // если корзина пуста

		if (this.items.get(item.id)) {
			// иначе
			this.items.delete(item.id);
		}

		this._events.emit('renderBasket', this.items);
	}

	getTotal(): number {
		return Array.from(this.items.values()).reduce(
			(total, item) => total + item.price,
			0
		);
	}

   getItemsCount(): number {
      return this.items.size;
   }

   getItems(): Map<string, IBasketItem> {
      return this.items;
  }
}
