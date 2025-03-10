import { IProduct } from "../../types/types";

interface ICatalogModel {
   items: IProduct[];                     // список товаров
   setProducts(items: IProduct): void;    // обновление списка товаров
   getProduct(id: string): IProduct;      // получение товара из каталога по его идентификатору
}