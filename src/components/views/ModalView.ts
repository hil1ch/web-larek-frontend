import { EventEmitter } from "../base/events";
import { View } from "./View";

export class ModalView extends View {
    _modalContainer: HTMLElement;

    constructor(events: EventEmitter) {
        super(events);

        this._modalContainer = document.querySelector("#modal-container");

        // Закрытие модального окна
        const closeButton = this._modalContainer.querySelector('.modal__close') as HTMLButtonElement;
        closeButton.addEventListener('click', () => this._modalContainer.classList.remove('modal_active'));
    }

    _renderModal(container: HTMLElement) {
        this._modalContainer.querySelector('.modal__content').replaceChildren(container);
        this._modalContainer.classList.add('modal_active');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(data: unknown): HTMLElement {
        throw ('Not implemented');
    }
}