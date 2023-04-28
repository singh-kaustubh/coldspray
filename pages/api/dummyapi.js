import Order from "../../models/Order";
import connectDb from "../../middlewear/mongoose";

const handler = async (req, res) => {
  let orders = await Order.find();
  orders.map(async (item) => {
    if (item.status == "Success") {
      item.status = "Paid";
    } else if (item.status == "Initiated") {
      item.status = "Pending";
    } else if (item.status == "Paid") {
      item.status = "Failed";
    }
    await Order.findOneAndUpdate(
      { orderId: item.orderId },
      { $set: item },
      { new: true }
    );
  });
  res.status(200).send(orders);
};

export default connectDb(handler);
