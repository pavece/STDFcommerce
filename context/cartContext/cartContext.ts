import { createContext } from "react";
import { ICartProduct } from "../../interfaces/cartProduct";

export interface IShippingAddress {
  name: string;
  surname: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}

export interface cartContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  totalPrice: number;
  fee: number;
  total: number;
  isLoaded: boolean;
  address: IShippingAddress;
  addProductToCart: (product: ICartProduct) => void;
  removeProductFromCart: (product: ICartProduct) => void;
  updateProductCount: (count: number, productSlug: string) => void;
  updateUserAddress: (address: IShippingAddress) => void;
}

export const CartContext = createContext({} as cartContextProps);
