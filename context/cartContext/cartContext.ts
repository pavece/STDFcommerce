import { createContext } from "react";
import { ICartProduct } from "../../interfaces/cartProduct";

export interface cartContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  totalPrice: number;
  fee: number;
  total: number;
  isLoaded: boolean;
  addProductToCart: (product: ICartProduct) => void;
  removeProductFromCart: (slug: string) => void;
  updateProductCount: (count: number, productSlug: string) => void;
}

export const CartContext = createContext({} as cartContextProps);
