import connectDb from "../../middlewear/mongoose";
import User from "../../models/User";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    const seckey = process.env.JWT_KEY;
    const response = jwt.verify(req.body.token, seckey);
    const temp = await User.find({ email: response.email }).select("-password");
    const usr = temp[0];
    return res.status(200).send(usr);
  } else {
    return res.status(500).json({ error: "Invalid method" });
  }
};
export default connectDb(handler);
