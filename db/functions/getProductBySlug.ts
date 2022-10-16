import { connect, disconnect } from "../db";
import { Product } from "../../models/productModel";

export const getProductBySlug = async (slug: string) => {
  await connect();
  const product = JSON.stringify(await Product.find({ slug }));
  await disconnect();
  return JSON.parse(product);
};
