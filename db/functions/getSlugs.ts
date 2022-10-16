import { connect, disconnect } from "../db";
import { Product } from "../../models/productModel";

export const getSlugs = async () => {
  await connect();
  const slugs = await Product.find({}).lean().select("slug -_id");
  await disconnect();
  return slugs;
};
