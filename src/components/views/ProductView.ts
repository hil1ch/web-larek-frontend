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
      const itemModalContainer = cloneTemplate('#card-preview') as HTMLElement;

      //Добавление товара в корзину
      const buyButton = itemModalContainer.querySelector('.card__button') as HTMLButtonElement;
      buyButton.addEventListener('click', () => {
         this._events.emit('addItemToBasket', item);
         item.isInBasket = true;

         // Условие для случаев, когда кнопка должна быть недоступна
         if (item.isInBasket || item.price == null) {
            buyButton.disabled = true;
         }
      })

      const categoryElement = itemModalContainer.querySelector('.card__category');
      categoryElement.textContent = item.category;
      categoryElement.classList.add(getCategoryName(item.category));

      itemModalContainer.querySelector('.card__title').textContent = item.name;
      itemModalContainer.querySelector('.card__price').textContent = item.price ? item.price + ' синапсов' : 'Бесценно';
      itemModalContainer.querySelector('.card__text').textContent = item.description;

      const imageElement = itemModalContainer.querySelector('.card__image') as HTMLImageElement;
      imageElement.src = `${CDN_URL}${item.image}`;

      this._renderModal(itemModalContainer);
      return itemModalContainer;
   }
}