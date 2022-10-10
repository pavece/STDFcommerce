import { cartState } from "./cartProvider";

import IProduct from "../../interfaces/product";

type cartType = { type: "cart - Add To Cart"; payload: IProduct[] };

export const cartReducer = (state: cartState, action: cartType): cartState => {
  switch (action.type) {
    case "cart - Add To Cart":
      console.log(state);

    default:
      return { ...state, cart: [...action.payload] };
  }
};
