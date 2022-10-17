import { cartState } from "./cartProvider";
import { ICartProduct } from "../../interfaces/cartProduct";

type cartType =
  | { type: "cart - Add To Cart"; payload: ICartProduct[] }
  | { type: "cart - Remove From Cart"; payload: ICartProduct[] }
  | {
      type: "cart - Load Cart";
      payload: { cart: ICartProduct[]; totalPrice: number };
    }
  | { type: "cart - Update Product Count"; payload: ICartProduct[] };

export const cartReducer = (state: cartState, action: cartType): cartState => {
  switch (action.type) {
    case "cart - Add To Cart":
      return { ...state, cart: [...action.payload] };

    case "cart - Load Cart":
      return {
        ...state,
        cart: action.payload.cart,
        totalPrice: action.payload.totalPrice,
        isLoaded: true,
      };
    case "cart - Remove From Cart":
      return {
        ...state,
        cart: action.payload,
      };
    case "cart - Update Product Count":
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
