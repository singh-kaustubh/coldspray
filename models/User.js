import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 20 },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 50,
    },
    password: { type: String, min: 6, required: true },
    phone: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
