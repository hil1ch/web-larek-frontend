import { EventEmitter } from "../base/events";
import { ModalView } from "./ModalView";
import { cloneTemplate } from "../../utils/utils";
import { IOrderForm, PaymentMethod } from "../../types/types";

export class OrderPaymentView extends ModalView {
   constructor(events: EventEmitter) {
      super(events)
   }

   render(data: { orderForm: Partial<IOrderForm>, payment: PaymentMethod }) {
      const { orderForm, payment } = data;

      const paymentContainer = cloneTemplate('#order') as HTMLFormElement;

      const orderButtons = paymentContainer.querySelectorAll('.button_alt');
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

      const addressInput = paymentContainer.querySelector('.form__input[name="address"]') as HTMLInputElement;
      const continueButton = paymentContainer.querySelector('.order__button') as HTMLButtonElement;

      // Кнопка недоступна, если поле адреса пустое
      continueButton.disabled = orderForm.address === '';
      addressInput.value = orderForm.address;

      // Обновление состояния кнопки и валидации
      this._events.emit('validateError', { paymentContainer, inputValue: addressInput.value });

      // Валидация поля адреса
      addressInput.addEventListener('input', () => {
         this._events.emit('changeAddressInput', {address: addressInput.value});

         if (addressInput.value === '') {
            continueButton.disabled = true;
         }

         this._events.emit('validateError', { paymentContainer, inputValue: addressInput.value });
      })

      // Переход на страницу с данными пользователя
      continueButton.addEventListener('click', () => {
         this._events.emit('showContactsView');
      })

      this._renderModal( paymentContainer);
      return paymentContainer;
   }
}