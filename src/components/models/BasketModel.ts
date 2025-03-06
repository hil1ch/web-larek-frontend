interface IBasketModel {
   items: Map<string, number>; // список товаров
   add(id: string): void;      // метод добавления товара по его идентификатору
   remove(id: string): void;   // метод удаления товара по его идентификатору
}


export class BasketModel implements IBasketModel {
   items: Map<string, number> = new Map();

   add(id: string): void {
      if (this.items.has(id)) {
         this.items.set(id, 0);
      } else {
         this.items.set(id, this.items.get(id)! + 1);
      }
   }

   remove(id: string): void {
      if (!this.items.has(id)) return; // если корзина пуста

      if (this.items.get(id)! > 0) { // иначе
         this.items.set(id, this.items.get(id)! - 1);
         if (this.items.get(id) === 0) this.items.delete(id);
      }
   }
}