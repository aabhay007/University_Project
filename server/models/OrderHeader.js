import mongoose, { Schema } from "mongoose";
const OrderHeaderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    orderDate: {
      type: Date,
    },
    shippingDate: {
      type: Date,
    },
    orderTotal: {
      type: Number,
    },
    trackingNumber: {
      type: String,
    },
    orderStatus: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
    paymentDueDate: {
      type: Date,
    },
    transactionId: {
      type: String,
    },
  
    streetaddress: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  
    phoneno: {
      type: String,
    },
    chargeId: {
      type: String,
    },
  },
  { timestamps: true }
);
const orderHeaderModel = mongoose.model("orderHeader", OrderHeaderSchema);
export default orderHeaderModel;
