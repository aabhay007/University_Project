import mongoose from "mongoose";
const ShoppingCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    count: {
      type: String,
    },
  },
  { timestamps: true }
);
const ShoppingCartModel = mongoose.model("shoppingCart", ShoppingCartSchema);
export default ShoppingCartModel;
