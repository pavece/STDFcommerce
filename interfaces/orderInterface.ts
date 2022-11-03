import { ICartProduct } from "./cartProduct";
export interface IOrder {
  _id?: string;
  paid: boolean;
  orderAuthorEmail: string;
  orderContent: ICartProduct[];
  orderTotalPrice: number;
  orderAuthorAddress: any;
}
