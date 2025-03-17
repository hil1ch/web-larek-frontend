import { EventEmitter } from "../base/events";
import { IView } from "./View";

export class BasketItemView implements IView {

   // элементы товара в корзине
   protected title: HTMLSpanElement;
   protected price: HTMLSpanElement;
   protected removeButton: HTMLButtonElement;

   protected id: string | null = null;

   constructor(protected container: HTMLElement, protected events: EventEmitter) {
      //инициализация элементов товара
      this.title = container.querySelector('.card__title') as HTMLSpanElement;
      this.price = container.querySelector('.card__price') as HTMLSpanElement;
      this.removeButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

      // устанавливаем событие удаления товара
      this.removeButton.addEventListener('click', () => this.events.emit('ui:remove-basket', { id: this.id }));
   }

   render(data: {id: string, title: string, price: string}) {
      if (data) {
         // если есть новые данные, то запомним их
         this.id = data.id;
         // и выведем в интерфейс
         this.title.textContent = data.title;
         this.price.textContent = data.price;
      }
      return this.container; // возвращаем контейнер для добавления в DOM
   }

}