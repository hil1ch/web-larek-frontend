import { EventEmitter } from "../base/events";
import { View } from "./View";
import { IProduct } from "../../types/types";
import { cloneTemplate, getCategoryName} from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";

export class CatalogItemView extends View {
   constructor(events: EventEmitter) {
      super(events)
   }

   render(item: IProduct) {
      const cardContainer = cloneTemplate('#card-catalog') as HTMLButtonElement;

      cardContainer.addEventListener('click', () => {
         this._events.emit("openCatalogItem", item);
      })

      const categoryElement = cardContainer.querySelector('.card_category');
      categoryElement.textContent = item.category;
      categoryElement.classList.add(getCategoryName(item.category));
      
      cardContainer.querySelector('.card_title').textContent = item.name;
      cardContainer.querySelector('.card_price').textContent = item.price ? item.price + ' синапсов' : 'Бесценно';
      
      const imageElement = cardContainer.querySelector('.card_image') as HTMLImageElement;
      imageElement.src = `${CDN_URL}${item.image}`;

      return cardContainer;
   }
}

