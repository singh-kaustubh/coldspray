import connectDb from "../../../middlewear/mongoose";
import Admin from "../../../models/admin/Admin";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    const seckey = process.env.ADMIN_JWT_KEY;
    const response = jwt.verify(req.body.token, seckey);
    const temp = await Admin.find({ email: response.email }).select(
      "-password"
    );
    const usr = temp[0];
    return res.status(200).send(usr);
  } else {
    return res.status(500).json({ error: "Invalid method" });
  }
};
export default connectDb(handler);
