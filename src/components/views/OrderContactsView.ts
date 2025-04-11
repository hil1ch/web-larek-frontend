import { EventEmitter } from '../base/events';
import { cloneTemplate } from '../../utils/utils';
import { ModalView } from './ModalView';

export class OrderContactsView extends ModalView {
	constructor(events: EventEmitter) {
		super(events);
	}

	render({ email, phone }: { email: string; phone: string }) {
		const container = cloneTemplate('#contacts') as HTMLFormElement;
		const emailInput = container.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		const phoneInput = container.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;

		const payButton = container.querySelector('.button') as HTMLButtonElement;

		// Кнопка неактивна, если поля не заполнены
		if (email === '' || phone === '') {
			payButton.disabled = true;
		}

		emailInput.value = email;
		phoneInput.value = phone;

		this._events.emit('validateError', {
			container,
			inputValue: emailInput.value && phoneInput.value,
		});

		// Валидация почты
		emailInput.addEventListener('input', () => {
			this._events.emit('changeEmailInput', { email: emailInput.value });
			payButton.disabled = emailInput.value === '' || phoneInput.value === '';
			this._events.emit('checkModalError', {
				container,
				inputValue: emailInput.value && phoneInput.value,
			});
		});

		// Валидация телефона
		phoneInput.addEventListener('input', () => {
			this._events.emit('changePhoneInput', { phone: phoneInput.value });
			payButton.disabled = emailInput.value === '' || phoneInput.value === '';
			this._events.emit('validateError', {
				container,
				inputValue: emailInput.value && phoneInput.value,
			});
		});

		// Переход на окно успешкой покупки
		payButton.addEventListener('click', () => {
			this._events.emit('showSuccessView');
		});

		this._renderModal(container);
		return container;
	}
}
