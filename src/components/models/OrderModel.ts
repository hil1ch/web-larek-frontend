import { IOrderForm } from "../../types/types";
import { EventEmitter } from "../base/events";
import { PaymentMethod } from "../../types/types";

interface IOrderModel  {
   orderForm: IOrderForm;
   setInput(orderForm: Partial<IOrderForm>): void;
   reset(): void;
   getPaymentMethod(): PaymentMethod;
   getAddress(): string;
   getEmail(): string;
   getPhone(): string;
}

export class OrderModel implements IOrderModel {
   orderForm: IOrderForm;
   _events: EventEmitter | null = null;

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

   getPaymentMethod() {
      return this.orderForm.payment as PaymentMethod;
   }

   getAddress() {
      return this.orderForm.address;
   }

   getEmail() {
      return this.orderForm.email;
   }

   getPhone() {
      return this.orderForm.phone;
   }
}