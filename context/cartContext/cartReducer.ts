import { cartState } from "./cartProvider";
import { ICartProduct } from "../../interfaces/cartProduct";
import { stat } from "fs";

type cartType =
  | { type: "cart - Add To Cart"; payload: ICartProduct[] }
  | { type: "cart - Remove From Cart"; payload: ICartProduct }
  | {
      type: "cart - Load Cart";
      payload: ICartProduct[];
    }
  | { type: "cart - Update Product Count"; payload: ICartProduct[] }
  | {
      type: "cart - Update General Values";
      payload: { totalCount: number; totalPrice: number };
    };

export const cartReducer = (state: cartState, action: cartType): cartState => {
  switch (action.type) {
    case "cart - Add To Cart":
      return { ...state, cart: [...action.payload] };

    case "cart - Load Cart":
      return {
        ...state,
        cart: action.payload,
        isLoaded: true,
      };
    case "cart - Remove From Cart":
      return {
        ...state,
        cart: state.cart.filter((element) => element !== action.payload),
      };
    case "cart - Update Product Count":
      return {
        ...state,
        cart: action.payload,
      };
    case "cart - Update General Values":
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        numberOfItems: action.payload.totalCount,
      };

    default:
      return state;
  }
};
