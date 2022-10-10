import { createContext } from "react";
import IProduct from "../../interfaces/product";

export interface cartContextProps {
  cart: IProduct[];
  numberOfItems: number;
  totalPrice: number;
  fee: number;
  total: number;
  isLoaded: boolean;
  addProductToCart: (product: IProduct) => void;
}

export const CartContext = createContext({} as cartContextProps);
