import Order from "../../models/Order";
import connectDb from "../../middlewear/mongoose";
const handler = async (req, res) => {
  if (req.method == `POST`) {
    const orders = await Order.find({ email: req.body.email });
    res.status(200).send(orders);
  } else {
    res.status(500).json({ error: "Invalid method" });
  }
};
export default connectDb(handler);
