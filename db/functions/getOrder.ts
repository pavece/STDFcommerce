import { connect, disconnect } from "../db";
import { OrderModel } from "../../models/ordersModel";

export const getOrder = async (orderId: string) => {
  await connect();
  const order = await OrderModel.findById(orderId);
  await disconnect();
  return JSON.stringify(order);
};
