import Admin from "../../../models/admin/Admin";
import connectDb from "../../../middlewear/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  const secKey = process.env.ADMIN_SECRET_KEY_CRYPTO;
  const jwtKey = process.env.ADMIN_JWT_KEY;
  if (req.method === `POST`) {
    try {
      if (req.body.password !== req.body.cpassword) {
        return res.status(400).json({
          success: false,
          error: "The two passwords do not match, please try again",
        });
      }
      const admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).json({
          success: false,
          error: "The email already exists in the database!",
        });
      }
      let a = new Admin({
        name: req.body.name,
        employee_ID: req.body.ID,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, secKey).toString(),
        phone: req.body.phone,
      });
      await a.save();
      let token = jwt.sign(
        { name: req.body.name, email: req.body.email },
        jwtKey,
        { expiresIn: "7d" }
      );
      res.status(200).json({
        success: true,
        name: req.body.name,
        email: req.body.email,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal server errorr" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};
export default connectDb(handler);
