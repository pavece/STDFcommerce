import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../models/productModel";
import { testProducts } from "../../testProducts";
import { connect, disconnect } from "../../db/db";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV == "development") {
    try {
      await connect();
      await Product.deleteMany();
      await Product.insertMany(testProducts);
      await disconnect();
      res.status(200).json({ status: "Database seeded correctly" });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .json({ status: "Something went wrong while seeding the database" });
    }
  } else {
    res
      .status(403)
      .json({ status: "This operation is not allowed in production mode" });
  }
}
