import Order from "../../../models/Order";
import connectDb from "../../../middlewear/mongoose";
const handler = async (req, res) => {
  if (req.method == `DELETE`) {
    try {
      await Order.findOneAndDelete({ orderId: req.body.orderId });
      res.status(200).json({
        success: true,
        message: `Successfully deleted orderID: ${req.body.orderId}, a notification has been sent to the user`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
  } else {
    return res.status(500).json({ success: false, error: "Invalid method!" });
  }
};
export default connectDb(handler);
