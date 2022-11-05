import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    paid: { type: Boolean, required: true, default: false },
    orderAuthorEmail: { type: String, required: true },
    orderContent: { type: Array, required: true },
    orderTotalPrice: { type: Number, required: true },
    orderTaxedPrice: { type: Number, required: true },
    orderShippingStatus: {
      type: String,
      enum: ["Unpaid", "Packaging", "In the truck", "In your city"],
      default: "Unpaid",
    },
    orderAuthorAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      zipCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
