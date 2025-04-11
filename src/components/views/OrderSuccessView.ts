import { EventEmitter } from '../base/events';
import { cloneTemplate } from '../../utils/utils';
import { ModalView } from './ModalView';

export class OrderSuccessView extends ModalView {
	constructor(events: EventEmitter) {
		super(events);
	}
	render(data: { id: string; total: number }) {
		const successContainer = cloneTemplate('#success') as HTMLFormElement;
		const orderSuccessDescription = successContainer.querySelector('.order-success__description');
		orderSuccessDescription.textContent = `Списано ${data.total} синапсов`;

		const successCloseButton = successContainer.querySelector('.order-success__close') as HTMLButtonElement;
		successCloseButton.addEventListener('click', () =>
			this._modalContainer.classList.remove('modal_active')
		);

		this._events.emit('clearBasketData');

		this._renderModal(successContainer);
		return successContainer;
	}
}
