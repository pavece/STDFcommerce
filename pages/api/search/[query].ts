import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../models/productModel";
import { connect, disconnect } from "../../../db/db";
import IProduct from "../../../interfaces/product";

type Data = { products: IProduct[] } | { status: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query.query!.toString().toLowerCase() || "";
  try {
    await connect();
    const products = await Product.find({ $text: { $search: query } });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Some error ocurred, please check the server console" });
  }
}
