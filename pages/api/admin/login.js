import Admin from "../../../models/admin/Admin";
import connectDb from "../../../middlewear/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  const secKey = process.env.ADMIN_SECRET_KEY_CRYPTO;
  const jwtKey = process.env.ADMIN_JWT_KEY;
  if (req.method === `POST`) {
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        const bytes = CryptoJS.AES.decrypt(admin.password, secKey);
        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.email == admin.email && req.body.password == decryptPass) {
          let token = jwt.sign(
            { name: admin.name, email: admin.email },
            jwtKey,
            {
              expiresIn: "7d",
            }
          );
          return res.status(200).json({
            success: true,
            name: admin.name,
            email: admin.email,
            token: token,
          });
        }
      }
      return res
        .status(400)
        .json({ success: false, error: "Invalid Credentials" });
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
