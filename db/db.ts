import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB || "");
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = async () => {
  try {
    if (mongoose.connections.length == 0) return;
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};
