import { connect, disconnect } from "../db";
import { UserModel } from "../../models/userModel";

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
    console.log(error);
  }
};
