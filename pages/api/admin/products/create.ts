import type { NextApiRequest, NextApiResponse } from "next";
import IProduct from "../../../../interfaces/product";
import { connect, disconnect } from "../../../../db/db";
import { Product } from "../../../../models/productModel";

type Data = {
  status: string;
  product?: IProduct;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { title, price, description, category } = req.body.product;
    const slug = title.split(" ").join("_");
    try {
      await connect();
      const collisionProduct = await Product.find({ slug });
      if (collisionProduct.length >= 1) {
        return res.status(418).json({ status: "The product already exists" });
      }

      const newProduct = new Product({
        slug,
        available: true,
        title,
        price,
        description,
        category,
        images: req.body.images,
      });

      await newProduct.save();
      await disconnect();

      return res
        .status(200)
        .json({ status: "Product created successfully", product: newProduct });
    } catch (error) {
      await disconnect();
      console.log(error);
      return res
        .status(500)
        .json({ status: "Something went wrong while creating the product" });
    }
  }

  res.status(200).json({ status: "Example" });
}
