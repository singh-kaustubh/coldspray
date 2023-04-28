import { request } from "https";
import connectDb from "../../middlewear/mongoose";
import PaytmChecksum from "paytmchecksum";
import Order from "../../models/Order";
import Product from "../../models/Product";
const handler = async (req, res) => {
  const MID = process.env.NEXT_PUBLIC_PAYTM_MID;
  const MKEY = process.env.PAYTM_MKEY;
  if (req.method == `POST`) {
    const cart = req.body.items;
    let sumtotal = 0;
    for (let object of cart) {
      const temp = await Product.find({ _id: object._id });
      const product = temp[0];
      sumtotal += product.price * object.cartQuantity;
      if (product.price != object.price) {
        res.status(500).json({
          success: false,
          error: "The prices in the cart have changed",
        });
        return;
      }
    }
    const val = req.body.hasShipping ? req.body.total - 30 : req.body.total;
    if (Math.floor(Math.abs(val - 1.18 * sumtotal))) {
      res
        .status(500)
        .json({ success: false, error: "The prices in the cart have changed" });
      return;
    }
    for (let object of cart) {
      if (object.color) {
        let product = await Product.findById(object._id);
        const cl = object.color;
        const sz = object.size;
        Object.keys(product._color).forEach((item) => {
          if (item == cl) {
            Object.keys(product._color[item]).forEach((obj) => {
              if (obj == sz) {
                const val = product._color[item][obj] - object.cartQuantity;
                if (val < 0) {
                  res.status(500).json({
                    success: false,
                    error: `Only ${
                      object.cartQuantity - product._color[item][obj]
                    } items left for ${
                      product.title
                    }, Kindly decrease the quantity and try again!`,
                  });
                  return;
                }
              }
            });
          }
        });
      } else if (object.size) {
        let product = await Product.findById(object._id);
        const val = object.size;
        Object.keys(product._sizeQty).forEach((item) => {
          if (item == val) {
            const val = product._sizeQty[item] - object.cartQuantity;
            if (val < 0) {
              res.status(500).json({
                success: false,
                error: `Only ${
                  object.cartQuantity - product._sizeQty[item]
                } items left for ${
                  product.title
                }, Kindly decrease the quantity and try again!`,
              });
              return;
            }
          }
        });
      } else {
        let product = await Product.findById(object._id);
        const val = product.availableQty - object.cartQuantity;
        if (val < 0) {
          res.status(500).json({
            success: false,
            error: `Only ${
              object.cartQuantity - product.availableQty
            } items left for ${
              product.title
            }, Kindly decrease the quantity and try again!`,
          });
          return;
        }
      }
    }
    const o = new Order({
      orderId: req.body.OID,
      productInfo: req.body.items,
      email: req.body.email,
      address: req.body.address,
      amount: req.body.total,
      hasShipping: req.body.hasShipping,
    });
    await o.save();
    var paytmParams = {};
    paytmParams.body = {
      requestType: "Payment",
      mid: MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.OID,
      callbackUrl: "http://localhost:3000/api/posttransaction",
      txnAmount: {
        value: req.body.total,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };
    var post_data = JSON.stringify(paytmParams);
    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        try {
          var options = {
            hostname: "securegw-stage.paytm.in",
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${MID}&orderId=${req.body.OID}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };
          var response = "";
          var post_req = request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });
            post_res.on("end", function () {
              let ress = JSON.parse(response).body;
              ress.success = true;
              resolve(ress);
            });
          });
          post_req.write(post_data);
          post_req.end();
        } catch (error) {
          console.log(error);
        }
      });
    };
    let myResponse = await requestAsync();
    res.status(200).json(myResponse);
  }
};
export default connectDb(handler);
