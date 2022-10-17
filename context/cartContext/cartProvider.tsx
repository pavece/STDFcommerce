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

    let totalPrice = 0;

    const prices = cart.map((product: ICartProduct) => {
      totalPrice += product.price * product.quantity;
      return product.price * product.quantity;
    });

    dispatch({
      type: "cart - Load Cart",
      payload: { cart, totalPrice },
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

  const updateProductCount = (count: number, productSlug: string) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = currentCart.map((element: ICartProduct) => {
      if (element.slug === productSlug) {
        return { ...element, quantity: count };
      }
      return element;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
