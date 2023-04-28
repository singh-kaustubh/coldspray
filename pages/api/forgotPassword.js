import connectDb from "../../middlewear/mongoose";
import nodemailer from "nodemailer";
import Forgot from "../../models/Forgot";
import User from "../../models/User";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    const token = Math.floor(
      Date.now() * Math.random() * (Math.random() * 10000 + 3.14)
    );
    const reset_password_url = `http://localhost:3000/forget?token=${token}`;
    const email = `We have sent you this email in response to your request to reset your password on <b>CodeSeven.com</b>. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
    <br/><br/>
    To reset your password, please follow the link below:

    <a href="${reset_password_url}">Click here</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and changing the password.

    <br/><br/>`;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "No such user exists in the system!",
        });
      }
      const phoneNumber = parseInt(req.body.phone);
      if (user.phone !== phoneNumber) {
        return res.status(400).json({
          success: false,
          error: "Invalid credentials!",
        });
      }
      let forgotEntry = new Forgot({
        userId: user._id,
        email: req.body.email,
        phone: phoneNumber,
        token: token,
        used: false,
      });
      await forgotEntry.save();
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      let info = await transporter.sendMail({
        from: '"CodeSeven.com" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject: "Password reset request",
        html: email,
      });
      res.status(200).json({
        success: true,
        message:
          "Email with token has been sent to you email address, kindly check and reset the password via the mailed Link!",
        previewURL: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error!" });
    }
  } else {
    return res.status(400).json({ success: false, error: "Invalid method!" });
  }
};
export default connectDb(handler);
