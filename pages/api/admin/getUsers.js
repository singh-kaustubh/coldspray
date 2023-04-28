import Users from "../../../models/User";
import Admin from "../../../models/admin/Admin";
import connectDb from "../../../middlewear/mongoose";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    const seckey = process.env.ADMIN_JWT_KEY;
    try {
      const response = jwt.verify(req.body.token, seckey);
      const temp = await Admin.findOne({ email: response.email });
      if (temp) {
        const users = await Users.find().select("-password");
        res.status(200).json({ success: true, users: users });
      } else if (!temp) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid access" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "Invalid access" });
    }
  } else {
    return res.status(500).json({ success: false, error: "Invalid method" });
  }
};
export default connectDb(handler);
