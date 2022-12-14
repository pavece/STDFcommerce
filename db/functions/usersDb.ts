import { UserModel } from "../../models/userModel";
import bcrypt from "bcrypt";
import { disconnect, connect } from "../db";

export const checkUser = async (email: string, password: string) => {
  await connect();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    if (bcrypt.compareSync(password, existingUser.password)) {
      await disconnect();
      return { email, role: existingUser.role, id: existingUser._id };
    } else {
      await disconnect();
      return null;
    }
  } else {
    const user = new UserModel({
      email,
      password: await bcrypt.hash(password, 10),
      orders: [],
      role: "user",
    });

    await user.save();
    await disconnect();
    return { email, role: user.role, id: user._id };
  }
};

export const createOauthUser = async (email: string, provider: string) => {
  await connect();

  const existingUser = await UserModel.findOne({ email, provider });

  if (existingUser) {
    return existingUser;
  }
  const oauthUser = new UserModel({
    email,
    role: "admin",
    orders: [],
    provider,
  });
  await oauthUser.save();
  await disconnect();

  return oauthUser;
};

export const getAllUsers = async () => {
  try {
    await connect();
    const users = JSON.stringify(
      await UserModel.find().lean().select("-password")
    );
    await disconnect();
    return JSON.parse(users);
  } catch (error) {
    await disconnect();
    console.log(error);
    return [];
  }
};
