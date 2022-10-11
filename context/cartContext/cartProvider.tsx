import IProduct from "../../interfaces/product";
import { useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { CartContext } from "./cartContext";
import { FC, ReactNode } from "react";
import { ICartProduct } from "../../interfaces/cartProduct";

const cartInitialState = {
  cart: [],
  numberOfItems: 0,
  totalPrice: 0,
  fee: 0,
  total: 0,
  isLoaded: false,
};

export interface cartState {
  cart: ICartProduct[];
  numberOfItems: number;
  totalPrice: number;
  fee: number;
  total: number;
  isLoaded: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addProductToCart = (product: ICartProduct) => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!localCart[0]) {
      localStorage.setItem("cart", JSON.stringify([product]));
    } else {
      localCart.push(product);
      localStorage.setItem("cart", JSON.stringify(localCart));
    }

    dispatch({
      type: "cart - Add To Cart",
      payload: [...state.cart, product],
    });
  };

  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
