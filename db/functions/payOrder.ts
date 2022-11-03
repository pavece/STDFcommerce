import { OrderModel } from "../../models/ordersModel";
import { connect, disconnect } from "../db";

export const payOrder = async (orderId: string) => {
  await connect();
  await OrderModel.findByIdAndUpdate(orderId, {
    paid: true,
    orderShippingStatus: "Packaging",
  });
  await disconnect();
};
