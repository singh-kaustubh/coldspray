import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    paymentInfo: { type: String },
    productInfo: { type: Object, required: true },
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "Initiated" },
    hasShipping: { type: Boolean, required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
