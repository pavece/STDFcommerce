import IProduct from "../../interfaces/product";
import { useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { CartContext } from "./cartContext";
import { FC, ReactNode, useEffect } from "react";
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

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch({
      type: "cart - Load Cart",
      payload: cart,
    });
  }, []);

  const addProductToCart = (product: ICartProduct) => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!localCart[0]) {
      localStorage.setItem("cart", JSON.stringify([product]));
    } else {
      if (
        localCart.some((element: ICartProduct) => element.slug === product.slug)
      ) {
        const col = localCart.filter((element: ICartProduct) => {
          return element.slug == product.slug;
        });

        const duplicatedElementIndex = localCart.indexOf(col[0]);

        const duplicateElement: ICartProduct =
          localCart[duplicatedElementIndex];

        localCart[duplicatedElementIndex] = {
          ...duplicateElement,
          quantity: duplicateElement.quantity + product.quantity,
        };
        localStorage.setItem("cart", JSON.stringify(localCart));
      } else {
        localCart.push(product);
        localStorage.setItem("cart", JSON.stringify(localCart));
      }
    }

    dispatch({
      type: "cart - Add To Cart",
      payload: [...state.cart, product],
    });
  };

  const removeProductFromCart = (slug: string) => {
    let currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const productToDelete = currentCart.filter(
      (element: ICartProduct) => element.slug === slug
    );
    currentCart.splice(currentCart.indexOf(productToDelete), 1);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    dispatch({ type: "cart - Remove From Cart", payload: currentCart });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addProductToCart, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
