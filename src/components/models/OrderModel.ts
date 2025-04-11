import { EventEmitter } from "../base/events";
import { PaymentMethod } from "../../types/types";

interface IOrderModel  {
   setPaymentMethod(method: PaymentMethod): void; // обновление способа оплаты
   setAdrress(address: string): void; // обновление поля адреса
   setEmail(email: string): void; // обновление поля почты
   setPhone(phone: string): void; // обновлени поля телефона
   reset(): void; // очистка всех полей после оформаления покупки
   getPaymentMethod(): PaymentMethod; // получение способа оплаты
   getAddress(): string; // получение адреса
   getEmail(): string; // получение почты
   getPhone(): string; // получениие телефона
}

export class OrderModel implements IOrderModel {
    _events: EventEmitter;
    paymentMethod: PaymentMethod;
    address: string;
    phone: string;
    email: string;

    constructor(events: EventEmitter) {
        this._events = events;
        this.paymentMethod = 'онлайн';
        this.address = '';
        this.email = '';
        this.phone = '';
    }

    reset() {
        this.paymentMethod = 'онлайн';
        this.address = '';
        this.email = '';
        this.phone = '';
    }

    setPaymentMethod(method: PaymentMethod) {
        this.paymentMethod = method;
    }

    setAdrress(address: string) {
        this.address = address;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPhone(phone: string) {
        this.phone = phone;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    getAddress() {
        return this.address;
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone;
    }
}