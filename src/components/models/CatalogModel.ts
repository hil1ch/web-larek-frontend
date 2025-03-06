import { Product } from "../../types/types";

interface ICatalogModel {
   items: Product[];                     // список товаров
   setProducts(items: Product): void;    // обновление списка товаров
   getProduct(id: string): Product;      // получение товара из каталога по его идентификатору
}