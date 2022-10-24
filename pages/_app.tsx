import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "../themes/lightTheme";
import { CartProvider } from "../context/cartContext/cartProvider";
import { UiProvider } from "../context/uiContext/uiProvider";
import { SessionProvider } from "next-auth/react";
import { Session } from "inspector";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <UiProvider>
        <CartProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </CartProvider>
      </UiProvider>
    </SessionProvider>
  );
}

export default MyApp;
