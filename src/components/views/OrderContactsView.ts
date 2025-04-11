import { ModalView } from "./ModalView";
import { EventEmitter } from "../base/events";
import { cloneTemplate } from "../../utils/utils";
import { IOrderForm } from "../../types/types";

export class OrderContactsView extends ModalView {
   constructor(events: EventEmitter) {
      super(events)
   }

   // Обновление состояния кнопки и валидации
   private _updateContactsButtonAndValidation(contactsContainer: HTMLFormElement, email: string, phone: string) {
      const payButton = contactsContainer.querySelector('.button') as HTMLButtonElement;
      if (email === '' || phone === '') {
         payButton.disabled = true;
      }
      this._events.emit('validateError', { contactsContainer, inputValue: email && phone });
  }

   render(orderForm: Partial<IOrderForm>) {
      const contactsContainer = cloneTemplate('#contacts') as HTMLFormElement;

      const emailInput = contactsContainer.querySelector('.form__input[name="email"]') as HTMLInputElement;
      const phoneInput = contactsContainer.querySelector('.form__input[name="phone"]') as HTMLInputElement;

      const payButton = contactsContainer.querySelector('.button') as HTMLButtonElement;

      emailInput.value = orderForm.email;
      phoneInput.value = orderForm.phone;

      this._updateContactsButtonAndValidation(contactsContainer, orderForm.email, orderForm.phone);

      // Валидация почты
      emailInput.addEventListener('input', () => {
         this._events.emit('changeEmailInput', {email: emailInput.value})
         this._updateContactsButtonAndValidation(contactsContainer, emailInput.value, phoneInput.value);
      })

      // Валидация телефона
      phoneInput.addEventListener('input', () => {
         this._events.emit('changePhoneInput', {phone: emailInput.value})
         this._updateContactsButtonAndValidation(contactsContainer, emailInput.value, phoneInput.value);
      })

      // Переход к окну успешного заказа
      payButton.addEventListener('click', () => {
         this._events.emit('showSuccessView');
      })

      this._renderModal(contactsContainer);
      return contactsContainer;
   }
}