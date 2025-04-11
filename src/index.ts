import './scss/styles.scss';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';

// models
import { BasketModel } from './components/models/BasketModel';
import { CatalogModel } from './components/models/CatalogModel';
import { OrderModel } from './components/models/OrderModel';

//views
import { BasketItemView } from './components/views/BasketItemView';
import { BasketView } from './components/views/BasketView';
import { CatalogItemView } from './components/views/CatalogItemView';
import { CatalogView } from './components/views/CatalogView';
import { OrderContactsView } from './components/views/OrderContactsView';
import { OrderPaymentView } from './components/views/OrderPaymentView';
import { OrderSuccessView } from './components/views/OrderSuccessView';
import { ProductView } from './components/views/ProductView';
import { BasketHeaderButtonView } from './components/views/BasketView';

import { API_URL } from './utils/constants';

import { IProduct, PaymentMethod } from './types/types';
import { getTotalPrice } from './utils/utils';

const api = new Api(API_URL);
const events = new EventEmitter();

const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);
const orderModel = new OrderModel(events);

const basketItemView = new BasketItemView(events);
const basketView = new BasketView(events);
const catalogItemView = new CatalogItemView(events);
const catalogView = new CatalogView(events);
const orderContactsView = new OrderContactsView(events);
const orderPaymentView = new OrderPaymentView(events);
const orderSuccessView = new OrderSuccessView(events);
const productView = new ProductView(events);
const basketHeaderButtonView = new BasketHeaderButtonView(events);

// Обработчик события изменения товаров каталога
events.on('changeCatalogItems', (items: IProduct[]) => {
   catalogView.render({ items: items.map(item =>catalogItemView.render(item)) })
});

// Обработчик открытия окна товара
events.on('openCatalogItem', (item: IProduct) => {
   productView.render(item);
});

// Обработчик изменения метода оплаты
events.on('changePaymentMethod', ({ payment }: { payment: PaymentMethod }) => {
   orderModel.setPaymentMethod(payment);
   events.emit('renderOrder');
});

// Обработчик изменения адреса
events.on('changeAddressInput', ({address}: {address: string}) => {
   orderModel.setAdrress(address);
});

// Обработчик изменения почты
events.on('changeEmailInput', ({email}: {email: string}) => {
   orderModel.setEmail(email);
});

// Обработчик изменения телефона
events.on('changePhoneInput', ({phone}: {phone: string}) => {
   orderModel.setPhone(phone);
});

// Обработчик очистки корзины после совершения покупки
events.on('clearBasketItems', () => {
   orderModel.reset();
   basketModel.clear();
   basketHeaderButtonView.render({ itemsCount: basketModel.getItemsCount() });
});

// Обработчик добавления товара в корзину
events.on('addItemToBasket', (item: IProduct) => {
   basketModel.add(item);
   basketHeaderButtonView.render({ itemsCount: basketModel.getItemsCount() });
});

// Обработчик удаления товара из корзины
events.on('deleteItemFromBasket', (item: IProduct) => {
   basketModel.remove(item);
   basketHeaderButtonView.render({ itemsCount: basketModel.getItemsCount() });
});

// Обработчик ошибок валидации
events.on('validateError', ({ container, inputValue }: { container: HTMLElement, inputValue: boolean }) => {
   const errorContainer = container.querySelector('.form__errors');
   inputValue ? errorContainer.textContent = '' : errorContainer.textContent = 'Поля не заполнены';
});

// Обработчик рендера корзины
events.on('renderBasket', () => {
   const itemsList = basketModel.getItems();
   const totalPrice = getTotalPrice(itemsList);
   const items = itemsList.map((item, id) => basketItemView.render({ item, id }));
   basketView.render({ items, totalPrice })
});

// Обработчики рендера формы заказа
events.on('renderOrder', () => {
   orderPaymentView.render({ address: orderModel.getAddress(), payment: orderModel.getPaymentMethod() });
});

events.on('showContactsView', () => {
   orderContactsView.render({ email: orderModel.getEmail(), phone: orderModel.getPhone() });
})

// Обработчик успешного оформления заказа
events.on('showSuccessView', () => {
   try {
       api.post('/order', {
           address: orderModel.getAddress(),
           email: orderModel.getEmail(),
           phone: orderModel.getPhone(),
           payment: orderModel.getPaymentMethod(),
           total: getTotalPrice(basketModel.getItems()),
           items: basketModel.getItems().map(item => item.id)
       });

       orderSuccessView.render({ items: basketModel.getItems() });
   } catch (error) {
       console.error("Ошибка при оформлении заказа:", error);
   }
})

// Загрузка товаров с сервера
api.get('/product')
   .then(({ items }: { items: IProduct[] }) => catalogModel.setProducts(items))






