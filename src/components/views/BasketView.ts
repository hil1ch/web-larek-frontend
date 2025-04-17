import { ModalView } from "./ModalView";
import { EventEmitter } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export class BasketView extends ModalView {
    private headerBasketButton: HTMLElement;
    private basketItemCounter: HTMLElement;

    constructor(events: EventEmitter) {
        super(events);
        this.headerBasketButton = document.querySelector('.header__basket');
        this.basketItemCounter = this.headerBasketButton.querySelector('.header__basket-counter');
        this.headerBasketButton.addEventListener('click', () => {
            this._events.emit('renderBasket');
        }) 
    }

    renderHeader({ itemsCount }: { itemsCount: number }): HTMLElement {
        this.basketItemCounter.textContent = itemsCount.toString();
        return this.headerBasketButton;
    }

    render(data: { items: HTMLElement[], totalPrice: number }): HTMLElement {
        const { items, totalPrice } = data;
        const container = cloneTemplate("#basket") as HTMLElement;
        const basketButton = container.querySelector('.basket__button') as HTMLButtonElement;

        basketButton.disabled = totalPrice === 0;

        basketButton.addEventListener('click', () => {
            this._events.emit('renderOrder');
        });

        const basketList = container.querySelector(".basket__list");
        items.forEach(item => basketList.appendChild(item));

        container.querySelector(".basket__price").textContent = `${totalPrice} синапсов`;

        this._renderModal(container);
        return container;
    }
}