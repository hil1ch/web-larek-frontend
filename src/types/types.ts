
// товар
export type Product = {
   id: string;                  // идентификатор товара
   name: string;                // название 
   description?: string;        // описание 
   price: number | null;        // стоимость
   category: string             // категория
   image: string;               // изображение
}
// товар в корзине
export type BasketItem = {
    id: string;                  // идентификатор 
    name: string;                // название 
    price: number | null;        // стоимость
 }

 // форма заказа
export type OrderForm = {
    payment: string;            // способ оплаты
    address: string;            // адрес доставки
    phone: string;              // номер телефона пользователя
    email: string;              // email пользователя
    total: string | number;     // общая сумма
    items: string[];            // массив идентификаторов приобретаемых товаров
 }