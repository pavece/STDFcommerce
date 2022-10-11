import { cartState } from "./cartProvider";

import { ICartProduct } from "../../interfaces/cartProduct";

type cartType = { type: "cart - Add To Cart"; payload: ICartProduct[] };

export const cartReducer = (state: cartState, action: cartType): cartState => {
  switch (action.type) {
    case "cart - Add To Cart":
      console.log(state);

    default:
      return { ...state, cart: [...action.payload] };
  }
};
