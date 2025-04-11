import { ModalView } from "./ModalView";
import { EventEmitter } from "../base/events";
import { cloneTemplate } from "../../utils/utils";
import { View } from "./View";

export class BasketView extends ModalView {
   constructor(events: EventEmitter) {
      super(events);
   }

   render({ items, totalPrice }: { items: HTMLElement[], totalPrice: number }) {
      const container = cloneTemplate("#basket") as HTMLElement;
      const basketButton = container.querySelector('.basket__button') as HTMLButtonElement;

      // Кнопка недоступна, если корзина пуста
      basketButton.disabled = totalPrice === 0;

      basketButton.addEventListener('click', () => {
          this._events.emit('renderOrder')
      })

      // Заполняем контейнер товарами
      const basketList = container.querySelector(".basket__list");
      items.map(item => basketList.appendChild(item))

      container.querySelector(".basket__price").textContent = `${totalPrice} синапсов`;

      this._renderModal(container);
      return container;
  }
}

export class BasketHeaderButtonView extends View {
   private headerBasketButton: HTMLElement;
   private basketItemCounter: HTMLElement;

   constructor(events: EventEmitter) {
       super(events);

       this.headerBasketButton = document.querySelector('.header__basket');
       this.init()
   }

   init() {
       this.basketItemCounter = this.headerBasketButton.querySelector('.header__basket-counter');

       this.headerBasketButton.onclick = () => this._events.emit('renderBasket');
   }

   render({ itemsCount }: { itemsCount: number }): HTMLElement {
       this.basketItemCounter.textContent = itemsCount.toString();

       return this.headerBasketButton;
   }
}