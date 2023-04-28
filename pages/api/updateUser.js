import connectDb from "../../middlewear/mongoose";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
  if (req.method == `PUT`) {
    const jwtkey = process.env.JWT_KEY;
    const secKey = process.env.SECRET_KEY_CRYPTO;
    const { name, token, phone, npassword, cnpassword, password } =
      await req.body;
    if (
      (npassword && npassword !== cnpassword) ||
      (cnpassword && npassword !== cnpassword)
    ) {
      return res.status(500).send({
        success: false,
        error: "The new password and confirm new password do not match!",
      });
    }
    const response = jwt.verify(token, jwtkey);
    const temp = await User.find({ email: response.email });
    const usr = temp[0];
    const bytes = CryptoJS.AES.decrypt(usr.password, secKey);
    const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
    if (decryptPass !== password) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
    if (name) {
      usr.name = name;
    }
    if (phone) {
      usr.phone = phone;
    }
    if (npassword) {
      usr.password = CryptoJS.AES.encrypt(npassword, secKey).toString();
    }
    try {
      await User.findOneAndUpdate(
        { email: usr.email },
        { $set: usr },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Successfully updated the user!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  } else {
    return res.status(500).json({ success: false, error: "Invalid method" });
  }
};
export default connectDb(handler);
