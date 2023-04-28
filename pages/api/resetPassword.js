import connectDb from "../../middlewear/mongoose";
import User from "../../models/User";
import Forgot from "../../models/Forgot";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    const { password, cpassword, token } = req.body;
    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        error: "The new password and confirm new password fields do not match!",
      });
    }
    const forgot = await Forgot.findOne({ token: token });
    const user = await User.findOne({ email: forgot.email });
    if (!forgot) {
      return res.status(400).json({ success: false, error: "Invalid token!" });
    }
    const time = forgot.createdAt;
    const curr_time = new Date();
    const minPassed = (curr_time - time) / 60000;
    if (minPassed > 15) {
      return res.status(400).json({
        success: false,
        error: "The token has expired, kindly generate a new token!",
      });
    }
    if (forgot.used) {
      return res.status(400).json({
        success: false,
        error: "The token has already been used once, kindly generate a new token!",
      });
    }
    const newPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY_CRYPTO
    ).toString();
    console.log(user);
    console.log(user.password);
    user.password = newPassword;
    await User.findOneAndUpdate(
      { email: user.email },
      { $set: user },
      { new: true }
    );
    forgot.used = true;
    await Forgot.findOneAndUpdate(
      { token: token },
      { $set: forgot },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `Successfully resetted the password for ${user.name}! Kindly login with new password to verify`,
    });
  } else {
    return res.status(500).json({ error: "Invalid method" });
  }
};
export default connectDb(handler);
