import { ICartProduct } from "./cartProduct";
export interface IOrder {
  _id?: string;
  paid: boolean;
  orderAuthorEmail: string;
  orderContent: ICartProduct[];
  orderTotalPrice: number;
  orderTaxedPrice: number;
  orderShippingStatus: "Unpaid" | "Packaging" | "In the truck" | "In your city";
  orderAuthorAddress: {
    fullName: string;
    address: string;
    zipCode: string;
    phone: string;
  };
  createdAt?: string;
}
