import mongoose from "mongoose";
import IProduct from "../interfaces/product";

const productSchema = new mongoose.Schema({
  images: [{ type: String }],
  title: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  available: { type: Boolean, required: true },
});

productSchema.index({ title: "text" });

export const Product: mongoose.Model<IProduct> =
  mongoose.models.Product || mongoose.model("Product", productSchema);
