import { EventEmitter } from "../base/events";
import { IView } from "./View";

export class BasketItemView implements IView {

   // элементы товара в корзине
   protected _title: HTMLSpanElement;
   protected _price: HTMLSpanElement;
   protected _removeButton: HTMLButtonElement;

   protected _id: string | null = null;

   constructor(protected container: HTMLElement, protected events: EventEmitter) {
      //инициализация элементов товара
      this._title = container.querySelector('.card__title') as HTMLSpanElement;
      this._price = container.querySelector('.card__price') as HTMLSpanElement;
      this._removeButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

      // устанавливаем событие удаления товара
      this._removeButton.addEventListener('click', () => this.events.emit('ui:remove-basket', { id: this._id }));
   }

   render(data: {id: string, title: string, price: string}) {
      if (data) {
         // если есть новые данные, то запомним их
         this._id = data.id;
         // и выведем в интерфейс
         this._title.textContent = data.title;
         this._price.textContent = data.price;
      }
      return this.container; // возвращаем контейнер для добавления в DOM
   }

}