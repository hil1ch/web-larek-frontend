import { OrderForm } from "../../types/types";

interface IOrderModel  {
   orderForm: OrderForm;
   setInput(orderForm: Partial<OrderForm>): void;
   reset(): void;
}