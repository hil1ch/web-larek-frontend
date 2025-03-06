interface IBasketModel {
   items: Map<string, number>; // список товаров
   add(id: string): void;      // метод добавления товара по его идентификатору
   remove(id: string): void;   // метод удаления товара по его идентификатору
}
