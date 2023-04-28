import User from "../../../models/User";
import Admin from "../../../models/admin/Admin";
import jwt from "jsonwebtoken";
import connectDb from "../../../middlewear/mongoose";
const handler = async (req, res) => {
  if (req.method == `DELETE`) {
    const seckey = process.env.ADMIN_JWT_KEY;
    try {
      const response = jwt.verify(req.body.token, seckey);
      const temp = await Admin.findOne({ email: response.email });
      if (temp) {
        await User.findOneAndDelete({ email: req.body.email });
        res.status(200).json({
          success: true,
          message: `Successfully deleted user w/: ${req.body.email}, a notification has been sent to the user`,
        });
      } else if (!temp) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid access" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
  } else {
    return res.status(500).json({ success: false, error: "Invalid method!" });
  }
};
export default connectDb(handler);
