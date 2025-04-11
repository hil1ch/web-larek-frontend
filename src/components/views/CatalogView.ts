import { EventEmitter } from "../base/events";
import { View } from "./View";

export class CatalogView extends View {
   private galleryContainer: HTMLElement;

   constructor(events: EventEmitter) {
      super(events)

      this.galleryContainer = document.querySelector('.gallery');
   }

   render({items}: {items: HTMLElement[]}) {
      this.galleryContainer.replaceChildren(...items);

      return this.galleryContainer;
   }
}