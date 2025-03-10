import { IOrderForm } from "../../types/types";

interface IOrderModel  {
   orderForm: IOrderForm;
   setInput(orderForm: Partial<IOrderForm>): void;
   reset(): void;
}