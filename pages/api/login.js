import User from "../../models/User";
import connectDb from "../../middlewear/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  const secKey = process.env.SECRET_KEY_CRYPTO;
  const jwtKey = process.env.JWT_KEY;
  if (req.method === `POST`) {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const bytes = CryptoJS.AES.decrypt(user.password, secKey);
        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.email == user.email && req.body.password == decryptPass) {
          let token = jwt.sign({ name: user.name, email: user.email }, jwtKey, {
            expiresIn: "365d",
          });
          return res.status(200).json({
            success: true,
            name: user.name,
            email: user.email,
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
