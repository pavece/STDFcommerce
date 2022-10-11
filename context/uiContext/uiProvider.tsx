import { UiContext } from "./uiContext";
import { ReactNode, useReducer } from "react";
import { FC } from "react";
import { uiReducer } from "./uiReducer";

const uiInitialState = {
  sideMenuOpen: false,
};

export interface uiState {
  sideMenuOpen: boolean;
}

interface Props {
  children: ReactNode;
}

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, uiInitialState);

  const uiOpenSideMenu = () => {
    dispatch({ type: "ui - Open Menu" });
  };
  const uiCloseSideMenu = () => {
     dispatch({ type: "ui - Close Menu" });
  };

  return (
    <UiContext.Provider value={{ ...state, uiOpenSideMenu, uiCloseSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
