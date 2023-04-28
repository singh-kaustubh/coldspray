import mongoose from "mongoose";
const ForgotSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    phone: { type: Number, required: true },
    token: { type: String, unique: true, required: true },
    used: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
