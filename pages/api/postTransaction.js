import connectDb from "../../middlewear/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {
  if (req.method == "POST") {
    var paytmChecksum = "";
    var paytmParams = {};
    const received_data = req.body;
    for (var key in received_data) {
      if (key == "CHECKSUMHASH") {
        paytmChecksum = received_data[key];
      } else {
        paytmParams[key] = received_data[key];
      }
    }
    var isValidChecksum = PaytmChecksum.verifySignature(
      paytmParams,
      process.env.PAYTM_MKEY,
      paytmChecksum
    );
    if (!isValidChecksum) {
      console.log(req.body.ORDERID);
      await Order.findOneAndDelete({ orderId: req.body.ORDERID });
      return res
        .status(500)
        .json({ success: false, error: "Internal server error!" });
    } else {
      if (req.body.STATUS === "TXN_FAILURE") {
        await Order.findOneAndUpdate(
          { orderId: req.body.ORDERID },
          { status: "Failed", paymentInfo: JSON.stringify(req.body) },
          { new: true }
        );
        res.status(500).send("The transaction has failed");
      } else if (req.body.STATUS === "PENDING") {
        await Order.findOneAndUpdate(
          { orderId: req.body.ORDERID },
          { status: "Pending", paymentInfo: JSON.stringify(req.body) },
          { new: true }
        );
        res.status(500).send("The transaction is currently pending");
      } else if (req.body.STATUS === "TXN_SUCCESS") {
        const tempProduct = await Order.findOneAndUpdate(
          { orderId: req.body.ORDERID.toString() },
          { status: "Paid", paymentInfo: JSON.stringify(req.body) },
          { new: true }
        );
        const cart = tempProduct.productInfo;
        for (let object of cart) {
          if (object.color) {
            let product = await Product.findById(object._id);
            const cl = object.color;
            const sz = object.size;
            Object.keys(product._color).forEach((item) => {
              if (item == cl) {
                Object.keys(product._color[item]).forEach((obj) => {
                  if (obj == sz) {
                    product._color[item][obj] =
                      product._color[item][obj] - object.cartQuantity;
                    return;
                  }
                });
              }
            });
            product.availableQty = product.availableQty - object.cartQuantity;
            await Product.findByIdAndUpdate(object._id, product);
          } else if (object.size) {
            let product = await Product.findById(object._id);
            const val = object.size;
            Object.keys(product._sizeQty).forEach((item) => {
              if (item == val) {
                product._sizeQty[item] =
                  product._sizeQty[item] - object.cartQuantity;
                return;
              }
            });
            product.availableQty = product.availableQty - object.cartQuantity;
            await Product.findByIdAndUpdate(object._id, product);
          } else {
            let product = await Product.findById(object._id);
            product.availableQty = product.availableQty - object.cartQuantity;
            await Product.findByIdAndUpdate(object._id, product);
          }
        }
        res.redirect(`/postcheckout?orderId=${req.body.ORDERID}`, 200);
      }
    }
  }
};
export default connectDb(handler);
