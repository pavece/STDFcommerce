import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export const userLogOut = async () => {
  const userSession = await getSession();

  if (userSession) {
    localStorage.removeItem("cart");
    localStorage.removeItem("shippingAddress");
    signOut();
  }
};
