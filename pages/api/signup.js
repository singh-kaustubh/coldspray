import User from "../../models/User";
import connectDb from "../../middlewear/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  const secKey = process.env.SECRET_KEY_CRYPTO;
  const jwtKey = process.env.JWT_KEY;
  if (req.method === `POST`) {
    try {
      if (req.body.password !== req.body.cpassword) {
        return res
          .status(400)
          .json({ error: "The two passwords do not match, please try again" });
      }
      let u = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, secKey).toString(),
        phone: req.body.phone,
      });
      await u.save();
      let token = jwt.sign(
        { name: req.body.name, email: req.body.email },
        jwtKey,
        { expiresIn: "365d" }
      );
      res.status(200).json({
        success: true,
        name: req.body.name,
        email: req.body.email,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server errorr" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
