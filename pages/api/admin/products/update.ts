import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../db/db";
import { Product } from "../../../../models/productModel";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const userProduct = { ...req.body.product, images: req.body.images };
      const productId = req.body.id;

      await connect();
      await Product.findByIdAndUpdate(productId, userProduct);
      await disconnect();

      return res.status(200).json({ status: "Product updated correctly" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "Some error occurred while updating the product" });
    }
  }
  res.status(405).json({ status: "Method not allowed" });
}
