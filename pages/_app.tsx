import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "../themes/lightTheme";
import { CartProvider } from "../context/cartContext/cartProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CartProvider>
  );
}

export default MyApp;
