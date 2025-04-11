import { EventEmitter } from "../base/events";
import { ModalView } from "./ModalView";
import { cloneTemplate } from "../../utils/utils";
import { PaymentMethod } from "../../types/types";

export class OrderPaymentView extends ModalView {
   constructor(events: EventEmitter) {
      super(events)
   }

   render({ payment, address }: { payment: PaymentMethod, address: string }) {

      const container = cloneTemplate('#order') as HTMLFormElement;

      const orderButtons = container.querySelectorAll('.button_alt');
      orderButtons.forEach((orderButton: HTMLButtonElement) => {
         // Активная кнопка
         if (orderButton.getAttribute('name') === payment.toString()) {
            orderButton.classList.add('button_alt-active');
         } else {
            orderButton.classList.remove('button_alt-active')
         }

         orderButton.addEventListener('click', () => {
            this._events.emit('changePaymentMethod', {payment: orderButton.getAttribute('name')})
         })
      })

      const addressInput = container.querySelector('.form__input[name="address"]') as HTMLInputElement;
      const continueButton = container.querySelector('.order__button') as HTMLButtonElement;

      // Кнопка недоступна, если поле адреса пустое
      continueButton.disabled = address === '';
      addressInput.value = address;

      // Обновление состояния кнопки и валидации
      this._events.emit('validateError', { container, inputValue: addressInput.value });

      // Валидация поля адреса
      addressInput.addEventListener('input', () => {
         this._events.emit('changeAddressInput', {address: addressInput.value});

         if (addressInput.value === '') {
            continueButton.disabled = true;
         }

         this._events.emit('validateError', { container, inputValue: addressInput.value });
      })

      // Переход на страницу с данными пользователя
      continueButton.addEventListener('click', () => {
         this._events.emit('showContactsView');
      })

      this._renderModal( container);
      return container;
   }
}