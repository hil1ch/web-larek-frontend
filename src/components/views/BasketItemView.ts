import { EventEmitter } from "../base/events";
import { cloneTemplate } from "../../utils/utils";
import { View } from "./View";
import { IProduct } from "../../types/types";

export class BasketItemView extends View {
    constructor(events: EventEmitter) {
        super(events);
    }

    render({ item, id }: { item: IProduct, id: number}) {
        const itemBasketContainer = cloneTemplate("#card-basket") as HTMLElement;
        const deleteButton = itemBasketContainer.querySelector(".basket__item-delete") as HTMLButtonElement;
        deleteButton.addEventListener('click', () => this._events.emit("deleteItemFromBasket", item));

        itemBasketContainer.querySelector(".basket__item-index").textContent = (id + 1).toString();
        itemBasketContainer.querySelector(".card__title").textContent = item.name;
        itemBasketContainer.querySelector(".card__price").textContent = item.price ? item.price + ' синапсов' : "Бесценно";

        return itemBasketContainer;
    }
}