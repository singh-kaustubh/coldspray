import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 20 },
    employee_ID: {
      type: String,
      default: "aboq9745",
      required: true,
      min: 8,
      max: 8,
    },
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
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
