import { EventEmitter } from "../base/events";
import { ModalView } from "./ModalView";
import { CDN_URL } from "../../utils/constants";
import { cloneTemplate, getCategoryName } from "../../utils/utils";
import { IProduct } from "../../types/types";

export class ProductView extends ModalView {
   constructor(events: EventEmitter) {
      super(events);
   }

   render(item: IProduct) {
      const container = cloneTemplate('#card-preview') as HTMLElement;

      //Добавление товара в корзину
      const buyButton = container.querySelector('.card__button') as HTMLButtonElement;
      buyButton.addEventListener('click', () => {
         this._events.emit('addItemToBasket', item);
         item.isInBasket = true;

         // Условие для случаев, когда кнопка должна быть недоступна
         if (item.isInBasket || item.price == null) {
            buyButton.disabled = true;
         }
      })

      const categoryElement = container.querySelector('.card__category');
      categoryElement.textContent = item.category;
      categoryElement.classList.add(getCategoryName(item.category));

      container.querySelector('.card__title').textContent = item.title;
      container.querySelector('.card__price').textContent = item.price ? item.price + ' синапсов' : 'Бесценно';
      container.querySelector('.card__text').textContent = item.description;

      const imageElement = container.querySelector('.card__image') as HTMLImageElement;
      imageElement.src = `${CDN_URL}${item.image}`;

      this._renderModal(container);
      return container;
   }
}