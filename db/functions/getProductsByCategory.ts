import { Product } from "../../models/productModel";
import { connect, disconnect } from "../db";

export const getProductsByCategory = async (category: string) => {
  await connect();
  const products = await Product.find({ category }).lean().select("-_id");
  await disconnect();
  return products;
};
