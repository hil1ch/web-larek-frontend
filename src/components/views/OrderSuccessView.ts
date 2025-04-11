import { EventEmitter } from '../base/events';
import { cloneTemplate, getTotalPrice } from '../../utils/utils';
import { ModalView } from './ModalView';
import { IProduct } from '../../types/types';

export class OrderSuccessView extends ModalView {
	constructor(events: EventEmitter) {
		super(events);
	}

	render({items}: {items: IProduct[]}) {
		const container = cloneTemplate('#success') as HTMLFormElement;
		const orderSuccessDescription = container.querySelector('.order-success__description');
		orderSuccessDescription.textContent = `Списано ${getTotalPrice(items)} синапсов`;

		const successCloseButton = container.querySelector('.order-success__close') as HTMLButtonElement;
		successCloseButton.addEventListener('click', () =>
			this._modalContainer.classList.remove('modal_active')
		);

		this._events.emit('clearBasketItems');

		this._renderModal(container);
		return container;
	}
}
