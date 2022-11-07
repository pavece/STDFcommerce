import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../../db/db";
import { Product } from "../../../../../models/productModel";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    try {
      const productId = req.query.id;
      await connect();
      await Product.findByIdAndDelete(productId);
      await disconnect();
      return res.status(200).json({ status: "Product deleted" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Something went wrong while deleting the product" });
    }
  }
  return res.status(405).json({ status: "Method not allowed" });
}
