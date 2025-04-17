
// товар
export interface IProduct {
   id: string;                  // идентификатор товара
   title: string;                // название 
   description?: string;        // описание 
   price: number | null;        // стоимость
   category: ProductCategory    // категория
   image: string;               // изображение
   isInBasket: boolean;         // товар в корзине (да - нет)
}

// товар в корзине
export interface IBasketItem {
    id: string;                  // идентификатор 
    title: string;                // название 
    price: number | null;        // стоимость
}

 // форма заказа
export interface IOrderForm {
    payment: string;            // способ оплаты
    address: string;            // адрес доставки
    phone: string;              // номер телефона пользователя
    email: string;              // email пользователя
    total: string | number;     // общая сумма
    items: string[];            // массив идентификаторов приобретаемых товаров
}

// категория товара
export type ProductCategory = 'софт-скил' | 'другое' | 'дполнительное' | 'хард-скил' | 'кнопка';

// Способ оплаты
export type PaymentMethod = 'онлайн' | 'при получении';