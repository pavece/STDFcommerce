import { createContext } from "react";

export interface IuiContext {
  sideMenuOpen: boolean;
  uiOpenSideMenu: () => void;
  uiCloseSideMenu: () => void;
}

export const UiContext = createContext({} as IuiContext);
