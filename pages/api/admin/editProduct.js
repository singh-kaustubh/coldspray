import Product from "../../../models/Product";
import Admin from "../../../models/admin/Admin";
import jwt from "jsonwebtoken";
import connectDb from "../../../middlewear/mongoose";
const handler = async (req, res) => {
  if (req.method == `PUT`) {
    try {
      const seckey = process.env.ADMIN_JWT_KEY;
      const response = jwt.verify(req.body.token, seckey);
      const temp = await Admin.findOne({ email: response.email });
      if (temp) {
        const product = await Product.findOne({ slug: req.body.slug });
        product.title = req.body.title;
        product.price = req.body.price;
        product.availableQty = req.body.availableQty;
        product.desc = req.body.desc;
        product.category = req.body.category;
        product.img = req.body.img;
        if (req.body._sizeQty) {
          product.size = req.body.size;
          product._sizeQty = req.body._sizeQty;
        } else if (req.body._color) {
          product.size = req.body.size;
          product._color = req.body._color;
          product.var_img = req.body.var_img;
        }
        if (req.body.rating) {
          product.rating = req.body.rating;
        }
        const temp = await Product.findOneAndUpdate(
          { _id: product._id },
          { $set: product },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: `Successfully updated the product ${temp.title.slice(
            0,
            20
          )}`,
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
