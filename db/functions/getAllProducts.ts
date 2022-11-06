import { connect, disconnect } from "../db";
import { Product } from "../../models/productModel";

export const getAllProducts = async () => {
  await connect();
  const products = JSON.stringify(await Product.find().lean());
  await disconnect();
  return JSON.parse(products);
};
