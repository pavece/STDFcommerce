import { useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { CartContext } from "./cartContext";
import { FC, useEffect } from "react";
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

  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    let totalPrice = 0;
    for (const product of state.cart) {
      totalPrice += product.price * product.quantity;
    }

    dispatch({
      type: "cart - Update General Values",
      payload: { totalPrice, totalCount: 0 },
    });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const products = state.cart;

    if (
      products.some((element: ICartProduct) => element.slug === product.slug)
    ) {
      const col = products.filter((element: ICartProduct) => {
        return element.slug == product.slug;
      });
      const duplicatedElementIndex = products.indexOf(col[0]);
      const duplicateElement: ICartProduct = products[duplicatedElementIndex];

      products[duplicatedElementIndex] = {
        ...duplicateElement,
        quantity: duplicateElement.quantity + product.quantity,
      };

      dispatch({
        type: "cart - Add To Cart",
        payload: products,
      });
    } else {
      dispatch({
        type: "cart - Add To Cart",
        payload: [...products, product],
      });
    }
  };

  const removeProductFromCart = (product: ICartProduct) => {
    if (state.cart.length == 1) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    dispatch({ type: "cart - Remove From Cart", payload: product });
  };

  const updateProductCount = (count: number, productSlug: string) => {
    const currentCart = state.cart;
    const updatedCart = currentCart.map((element: ICartProduct) => {
      if (element.slug === productSlug) {
        return { ...element, quantity: count };
      }
      return element;
    });
    dispatch({ type: "cart - Update Product Count", payload: updatedCart });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeProductFromCart,
        updateProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
