import { IOrderForm } from "../../types/types";
import { EventEmitter } from "../base/events";

interface IOrderModel  {
   orderForm: IOrderForm;
   setInput(orderForm: Partial<IOrderForm>): void;
   reset(): void;
}

export class OrderModal implements IOrderModel {
   orderForm: IOrderForm;
   protected _submit: HTMLButtonElement;
   protected _events: EventEmitter | null = null;

   constructor(events: EventEmitter) {
      this._events = events;
   }

   // метод обновляет данные формы
   setInput(orderForm: Partial<IOrderForm>): void {
      this.orderForm = {
         ...this.orderForm,
         ...orderForm,
      }
   }
 
   // метод сбрасывает форму
   reset() {
      this.orderForm = {
         payment: '',
         address: '',
         phone: '',
         email: '',
         total: this.orderForm.total,
         items: [...this.orderForm.items],
      }
   }

   // управление состоянием кнопки
   set disableSubmitButton(flag: boolean) {
      this._submit.disabled = !flag;
   }
}