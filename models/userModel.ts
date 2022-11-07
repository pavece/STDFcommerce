import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: false },
    orders: {type: Array, required: true, default: []},
    provider: {type: String, required: false},
    role: {
      type: String,
      enum: { values: ["admin", "user"], default: "user" },
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
