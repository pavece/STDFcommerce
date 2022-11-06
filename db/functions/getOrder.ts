import { connect, disconnect } from "../db";
import { OrderModel } from "../../models/ordersModel";

export const getOrder = async (orderId: string) => {
  await connect();
  const order = await OrderModel.findById(orderId);
  await disconnect();
  return JSON.stringify(order);
};

export const getAllOrders = async () => {
  try {
    await connect();
    const orders = JSON.stringify(await OrderModel.find().lean());
    await disconnect();
    return JSON.parse(orders);
  } catch (error) {
    await disconnect();
    console.log(error);
    return [];
  }
};
