import Order from "../../models/Order";
import connectDb from "../../middlewear/mongoose";

const handler = async (req, res) => {
  let orders = await Order.find();
  res.status(200).send(orders);
};

export default connectDb(handler);
