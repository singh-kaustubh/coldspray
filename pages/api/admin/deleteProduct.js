import Product from "../../../models/Product";
import Admin from "../../../models/admin/Admin";
import jwt from "jsonwebtoken";
import connectDb from "../../../middlewear/mongoose";
const handler = async (req, res) => {
  if (req.method == `DELETE`) {
    try {
      const seckey = process.env.ADMIN_JWT_KEY;
      const response = jwt.verify(req.body.token, seckey);
      const temp = await Admin.findOne({ email: response.email });
      if (temp) {
        await Product.findOneAndDelete({ slug: req.body.slug });
        res.status(200).json({
          success: true,
          message: `Successfully deleted Product w/: ${req.body.slug}`,
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
