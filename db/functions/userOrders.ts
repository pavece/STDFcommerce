import { connect, disconnect } from "../db";
import { UserModel } from "../../models/userModel";
import { OrderModel } from "../../models/ordersModel";
import mongoose from "mongoose";

export const assignOrderToUser = async (email: string, orderId: string) => {
  try {
    await connect();
    const user = await UserModel.findOne({ email });
    await UserModel.findOneAndUpdate(
      { email },
      { orders: [...user.orders, orderId] }
    );
    await disconnect();
  } catch (error) {
    console.log(error);
    await disconnect();
  }
};

export const verifyUserOrder = async (email: string, orderId: string) => {
  try {
    await connect();
    const user = await UserModel.findOne({ email });
    await disconnect();
    if (user.orders.includes(orderId)) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    await disconnect();
  }
};

export const deleteOrderFromUser = async (email: string, orderId: string) => {
  try {
    await connect();

    const user = await UserModel.findOne({ email });
    const newOrders = user.orders.splice(user.orders.indexOf(orderId), 1);
    await UserModel.findOneAndUpdate({ email }, { orders: newOrders });

    await disconnect();
  } catch (error) {
    await disconnect();
    console.log(error);
  }
};

export const getUserOrders = async (email: string) => {
  try {
    await connect();
    const { orders } = await UserModel.findOne({ email });
    const userOrders: any = [];
    if (orders.length >= 1) {
      for (const order of orders) {
        const userOrder = await OrderModel.findById(order);
        if (userOrder) {
          userOrders.push(userOrder);
        }
      }
    }
    await disconnect();
    return JSON.parse(JSON.stringify(userOrders));
  } catch (error) {
    await disconnect();
    console.log(error);
    return [];
  }
};
