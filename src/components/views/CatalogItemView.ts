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
      const container = cloneTemplate('#card-catalog') as HTMLButtonElement;

      container.addEventListener('click', () => {
         this._events.emit("openCatalogItem", item);
      })

      const categoryElement = container.querySelector('.card__category');
      categoryElement.textContent = item.category;
      categoryElement.classList.add(getCategoryName(item.category));
      
      container.querySelector('.card__title').textContent = item.name;
      container.querySelector('.card__price').textContent = item.price ? item.price + ' синапсов' : 'Бесценно';
      
      const imageElement = container.querySelector('.card__image') as HTMLImageElement;
      imageElement.src = `${CDN_URL}${item.image}`;

      return container;
   }
}

