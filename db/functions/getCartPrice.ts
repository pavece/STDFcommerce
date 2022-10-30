import { ICartProduct } from "../../interfaces/cartProduct";
import { connect, disconnect } from "../db";
import { Product } from "../../models/productModel";

export const getCartPrices = async (products: ICartProduct[]) => {
  let finalPrice = 0;
  await connect();
  const dbProducts = await Product.find({});

  products.forEach(async (product) => {
    const quantity = product.quantity;

    const dbProduct = dbProducts.find(({ slug }) => slug === product.slug);

    finalPrice = finalPrice + dbProduct!.price * quantity;
  });

  await disconnect();

  return finalPrice;
};
