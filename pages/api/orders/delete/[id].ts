import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../db/db";
import { OrderModel } from "../../../../models/ordersModel";
import { UserModel } from "../../../../models/userModel";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

type Data = { status: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    const id = req.query.id;
    const userSession = await unstable_getServerSession(req, res, authOptions);

    try {
      await connect();
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(404).json({ status: "Order not found" });
      }
      if (order.paid !== false) {
        return res
          .status(403)
          .json({ status: "The order can't be deleted after being paid" });
      }
      await OrderModel.findByIdAndDelete({ _id: id });
      const user = await UserModel.findOne({ email: userSession?.user?.email });
      if (!user.orders.includes(id)) {
        return res.status(403).json({ status: "This order is not yours" });
      }
      const newOrders = user.orders.splice(user.orders.indexOf(id), 1);
      await UserModel.updateOne(
        { email: userSession?.user?.email },
        { orders: newOrders }
      );

      await disconnect();
      return res.status(200).json({ status: "Order has been deleted" });
    } catch (error) {
      await connect();
      console.log(error);
      return res
        .status(500)
        .json({ status: "Some error ocurred deleting the order" });
    }
  }
  return res.status(405).json({ status: "This method is not allowed" });
}
