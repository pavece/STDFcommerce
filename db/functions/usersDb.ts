import { UserModel } from "../../models/userModel";
import bcrypt from "bcrypt";
import { disconnect, connect } from "../db";

export const checkUser = async (email: string, password: string) => {
  await connect();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    if (bcrypt.compareSync(password, existingUser.password)) {
      await disconnect();
      return { email, role: "admin", id: existingUser._id };
    } else {
      await disconnect();
      return null;
    }
  } else {
    const user = new UserModel({
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    await disconnect();
    return { email, role: "admin", id: user._id };
  }
};

export const createOauthUser = async (email: string) => {
  await connect();
  const oauthUser = new UserModel({ email, role: "admin" });
  await oauthUser.save();
  await disconnect();

  return oauthUser;
};
