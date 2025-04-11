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

import { IOrderForm, IProduct, PaymentMethod } from './types/types';

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

events.on('changeCatalogItems', (items: IProduct[]) => {
   catalogView.render({ items: items.map(item => new ProductView(events).render(item)) })
});

events.on('changePaymentMethod', ({ payment }: { payment: PaymentMethod }) => {
   orderModel.setInput({ payment });
   events.emit('renderOrder');
});

events.on('changeAddressInput', (address: Partial<IOrderForm>) => {
   orderModel.setInput(address);
});

events.on('changeEmailInput', (email: Partial<IOrderForm>) => {
   orderModel.setInput(email);
});
events.on('changePhoneInput', (phone: Partial<IOrderForm>) => {
   orderModel.setInput(phone);
});

events.on('openCatalogItem', (item: IProduct) => {
   productView.render(item);
});

events.on('addItemToBasket', (item: IProduct) => {
   basketModel.add(item);
   basketHeaderButtonView.render({ itemsCount: basketModel.getItemsCount() });
});

events.on('deleteItemFromBasket', (item: IProduct) => {
   basketModel.remove(item);
   basketHeaderButtonView.render({ itemsCount: basketModel.getItemsCount() });
});

events.on('validateError', ({ container, inputValue }: { container: HTMLElement, inputValue: boolean }) => {
   const errorContainer = container.querySelector('.form__errors');
   inputValue ? errorContainer.textContent = '' : errorContainer.textContent = 'Заполнены не все поля!';
});

events.on('renderBasket', () => {
   const itemsMap = basketModel.getItems();
   const totalPrice = basketModel.getTotal();
   const items = Array.from(itemsMap.entries()).map(([id, item]) => 
      new BasketItemView(events).render({ item, id })
   );
   basketView.render({ items, totalPrice });
});

events.on('renderOrder', () => {
   orderPaymentView.render({ 
       orderForm: { 
           address: orderModel.getAddress() 
       }, 
       payment: orderModel.getPaymentMethod() 
   });
});

events.on('showContactsView', () => {
   orderContactsView.render({ email: orderModel.getEmail(), phone: orderModel.getPhone() });
})

events.on('showContactsView', () => {
   try {
       api.post('/order', {
           address: orderModel.getAddress(),
           email: orderModel.getEmail(),
           phone: orderModel.getPhone(),
           payment: orderModel.getPaymentMethod(),
           total: basketModel.getTotal(basketModel.getItems()),
           items: basketModel.getItems().map(item => item.id)
       });

       orderSuccessView.render({ items: basketModel.getItems() });
   } catch (error) {
       console.error("Ошибка при оформлении заказа:", error);
   }
})


api.get('/product')
   .then(({ items }: { items: IProduct[] }) => catalogModel.setProducts(items))






