
// товар
export interface IProduct {
   id: string;                  // идентификатор товара
   name: string;                // название 
   description?: string;        // описание 
   price: number | null;        // стоимость
   category: ProductCategory    // категория
   image: string;               // изображение
}
// товар в корзине
export interface IBasketItem {
    id: string;                  // идентификатор 
    name: string;                // название 
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