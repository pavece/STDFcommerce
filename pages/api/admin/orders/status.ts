import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../db/db";
import { OrderModel } from "../../../../models/ordersModel";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const orderId = req.body.orderId;
    const status = req.body.status;
    try {
      await connect();
      await OrderModel.findByIdAndUpdate(orderId, {
        orderShippingStatus: status,
      });
      await disconnect();
      return res
        .status(200)
        .json({ status: `Order status updated correctly to: ${status}` });
    } catch (error) {
      return res.status(500).json({
        status:
          "Some error occurred in the server while updating the order status",
      });
    }
  }
  res.status(405).json({ status: "Method not allowed" });
}
