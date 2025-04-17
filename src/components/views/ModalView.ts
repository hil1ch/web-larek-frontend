import { EventEmitter } from "../base/events";
import { View } from "./View";

export abstract class ModalView extends View {
    // DOM-элемент контейнера модального окна
    _modalContainer: HTMLElement;

    constructor(events: EventEmitter) {
        super(events);
        this._modalContainer = document.querySelector("#modal-container");
        const closeButton = this._modalContainer.querySelector('.modal__close') as HTMLButtonElement;

        closeButton.addEventListener('click', () => {
            this._modalContainer.classList.remove('modal_active');
        });
    }

    // Рендер содержимого модального окна
    _renderModal(container: HTMLElement) {
        this._modalContainer.querySelector('.modal__content').replaceChildren(container);
        this._modalContainer.classList.add('modal_active');
    }

    
    abstract render(data?: unknown): HTMLElement;
}