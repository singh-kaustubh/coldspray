import Product from "../../../models/Product";
import Admin from "../../../models/admin/Admin";
import jwt from "jsonwebtoken";
import connectDb from "../../../middlewear/mongoose";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    try {
      const seckey = process.env.ADMIN_JWT_KEY;
      const response = jwt.verify(req.body.token, seckey);
      const temp = await Admin.findOne({ email: response.email });
      if (temp) {
        const p = new Product({
          title: req.body.title,
          price: req.body.price,
          availableQty: req.body.availableQty,
          slug: req.body.slug,
          desc: req.body.desc,
          category: req.body.category,
          img: req.body.img,
        });
        await p.save();
        p.slug = p._id;
        if (req.body._sizeQty) {
          p.size = req.body.size;
          p._sizeQty = req.body._sizeQty;
        } else if (req.body._color) {
          p.size = req.body.size;
          p._color = req.body._color;
          p.var_img = req.body.var_img;
        }
        if (req.body.rating) {
          p.rating = req.body.rating;
        }
        const temp = await Product.findOneAndUpdate(
          { _id: p._id },
          { $set: p },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: `Successfully added the product ${temp.title.slice(0, 20)}`,
        });
        // size: { type: Array },
        //   _sizeQty: { type: Object },
        //   _color: { type: Object },
        //   var_img: { type: Object },
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
