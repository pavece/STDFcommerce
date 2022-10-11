import { uiState } from "./uiProvider";

type uiType = { type: "ui - Open Menu" } | { type: "ui - Close Menu" };

export const uiReducer = (state: uiState, action: uiType): uiState => {
  switch (action.type) {
    case "ui - Open Menu":
      return {
        ...state,
        sideMenuOpen: true,
      };
    case "ui - Close Menu":
      return {
        ...state,
        sideMenuOpen: false,
      };

    default:
      return { ...state, sideMenuOpen: false };
  }
};
