import { cartState } from "./cartProvider";

import { ICartProduct } from "../../interfaces/cartProduct";

type cartType =
  | { type: "cart - Add To Cart"; payload: ICartProduct[] }
  | { type: "cart - Remove From Cart"; payload: ICartProduct[] }
  | { type: "cart - Load Cart"; payload: ICartProduct[] };

export const cartReducer = (state: cartState, action: cartType): cartState => {
  switch (action.type) {
    case "cart - Add To Cart":
      return { ...state, cart: [...action.payload] };

    case "cart - Load Cart":
      return {
        ...state,
        cart: action.payload,
        isLoaded: true
      };
    case "cart - Remove From Cart":
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
