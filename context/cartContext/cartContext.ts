import { createContext } from "react";
import IProduct from "../../interfaces/product";
import { ICartProduct } from '../../interfaces/cartProduct';

export interface cartContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  totalPrice: number;
  fee: number;
  total: number;
  isLoaded: boolean;
  addProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as cartContextProps);
