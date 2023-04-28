/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/carttSlice";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function Checkout() {
  const dispatch = useDispatch();
  const handleRemove = (item) => {
    dispatch(actions.removeFromCart(item));
    return;
  };
  const cart = useSelector((state) => state.cart);
  const [orderAddress, setOrderAddress] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "Please enter the pincode",
    state: "Please enter the pincode",
    pincode: "",
  });
  const fetchCitystate = async (pincode) => {
    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      const response = data[0];
      const state = response.PostOffice
        ? response.PostOffice[0].State
        : "invalid pincode";
      const city = response.PostOffice
        ? response.PostOffice[0].District
        : "invalid pincode";
      setOrderAddress({
        ...orderAddress,
        state: state,
        city: city,
        pincode: pincode,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const isDisabled = () => {
    if (
      orderAddress.email.length < 3 ||
      orderAddress.address.length < 3 ||
      orderAddress.city.length < 3 ||
      orderAddress.name.length < 3 ||
      orderAddress.phone.length < 3 ||
      orderAddress.pincode.length < 3 ||
      orderAddress.state.length < 3 ||
      cart.cartTotalAmount == 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [email, setEmail] = useState();
  const handleChange = (e) => {
    setOrderAddress({ ...orderAddress, [e.target.name]: e.target.value });
    if (e.target.name == "pincode" && e.target.value.length == 6) {
      fetchCitystate(e.target.value);
    } else if (
      e.target.name == "pincode" &&
      (e.target.value.length != 6 || !Number.isInteger(e.target.value))
    ) {
      setOrderAddress({
        ...orderAddress,
        state: "Please enter a valid pincode",
        city: "Please enter a valid pincode",
        pincode: e.target.value,
      });
    }
  };
  const fetchUser = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/fetchUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const response = await res.json();
      setEmail(response.email);
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("auth-token")
        ? localStorage.getItem("auth-token")
        : "";
    if (token.length) {
      fetchUser(token);
    } else {
      router.push("/login");
    }
  });
  const items = cart.cartItems;
  const total = (
    cart.cartTotalAmount < 500
      ? 1.18 * cart.cartTotalAmount + 30
      : 1.18 * cart.cartTotalAmount
  ).toFixed(2);
  const hasShipping = cart.cartTotalAmount < 500 ? true : false;
  const OID = Math.floor(Date.now() * Math.random());
  const data = {
    items,
    total,
    OID,
    email: email,
    address: orderAddress,
    hasShipping,
  };
  const PAYTM_HOST = process.env.NEXT_PUBLIC_PAYTM_HOST;
  const PAYTM_MID = process.env.NEXT_PUBLIC_PAYTM_MID;
  const initiatePayment = async () => {
    const response = await fetch("http://localhost:3000/api/pretransaction", {
      method: `POST`,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const txnbody = await response.json();
    let txnToken;
    if (txnbody.success) {
      txnToken = txnbody.txnToken;
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: OID,
          token: txnToken,
          tokenType: "TXN_TOKEN",
          amount: total,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };
      {
        typeof window !== "undefined" &&
          window.Paytm.CheckoutJS.init(config)
            .then(function onSuccess() {
              window.Paytm.CheckoutJS.invoke();
            })
            .catch(function onError(error) {
              console.log("error => ", error);
            });
      }
    } else if (!txnbody.success) {
      toast.warn(txnbody.error, {
        theme: "dark",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(actions.postcheckoutClearcart());
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success(`Successfully updated the address`, {
      theme: "dark",
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="2xl:container 2xl:mx-auto py-24 px-4 md:px-6 xl:px-20">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        id="payment"
        type="application/javascript"
        crossorigin="anonymous"
        src={`${PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${PAYTM_MID}.js`}
      >
        {" "}
      </Script>
      <div className="flex flex-col xl:flex-row justify-center  xl:space-y-0 xl:space-x-8">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="font-semibold text-3xl">Delivery Details</h2>
          <div className=" flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={orderAddress.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={orderAddress.email}
                  onChange={handleChange}
                  name="email"
                  className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="flex my-2">
            <div className="px-2 w-full">
              <label
                htmlFor="address"
                className="leading-7 text-sm text-gray-600"
              >
                Address
              </label>
              <textarea
                id="address"
                required
                name="address"
                value={orderAddress.address}
                onChange={handleChange}
                className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                cols="30"
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className=" flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="number"
                  required
                  id="phone"
                  min="1000000000"
                  max="9999999999"
                  placeholder="Enter 10 digit phone number"
                  onChange={handleChange}
                  value={orderAddress.phone}
                  name="phone"
                  className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter 6 digit pincode"
                  id="pincode"
                  minLength={6}
                  maxLength={6}
                  value={orderAddress.pincode}
                  onChange={handleChange}
                  name="pincode"
                  className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white   focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className=" flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  required
                  name="state"
                  value={orderAddress.state}
                  readOnly={true}
                  className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={orderAddress.city}
                  readOnly={true}
                  name="city"
                  className="w-full border-2 border-gray-900 mx-auto rounded-md bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center pb-[1.1rem] flex-col">
            <button
              type="submit"
              className="py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  w-full text-base font-medium leading-4 text-white bg-gray-800 hover:bg-black"
            >
              Confirm your name and Delivery address
            </button>
          </div>
        </form>
        <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
          <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">
            Order Summary
          </h3>
          <p className="text-base leading-none mt-4 text-gray-800">
            Paid using: Credit Card/Debit Card/UPI/COD
          </p>
          {!cart.cartItems.length && (
            <Link href={"/"}>
              <p className="cursor-pointer text-center text-3xl leading-none mt-10 text-gray-800">
                Your cart is empty! Browse items now 😎
              </p>
            </Link>
          )}
          <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
            {cart.cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full"
                >
                  <div className="w-40 md:w-32">
                    <img className="md:block" src={item.img} alt="..." />
                  </div>
                  <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                    <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                      <h3 className="text-lg md:text-xl  w-full font-semibold leading-6 md:leading-5  text-gray-800">
                        {item.title.slice(0, 30)}
                      </h3>
                      <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                        <p className="text-sm leading-none text-gray-600">
                          <b>Size: </b>
                          <span className="text-gray-800"> {item.size}</span>
                        </p>
                        <p className="text-sm leading-none text-gray-600">
                          <b>Quantity: </b>
                          <span className="text-gray-800">
                            {" "}
                            {item.cartQuantity}
                          </span>
                        </p>
                        <button
                          onClick={() => handleRemove(item)}
                          className="flex text-sm leading-none p-1 -mt-1 text-white bg-red-900 border-0  focus:outline-none hover:scale-105 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                      <p className="text-base lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                        ${(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">
                    Subtotal (incl. 18% GST)
                  </p>
                  <p className="text-base leading-4 text-gray-600">
                    ${(1.18 * cart.cartTotalAmount).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">
                    Discount{" "}
                    <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                      Free shipping over $499
                    </span>
                  </p>
                  <p className="text-base leading-4 text-gray-600">
                    {cart.cartTotalQuantity
                      ? cart.cartTotalAmount > 499
                        ? "-$30.00"
                        : "$0"
                      : "$0"}
                  </p>
                </div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">
                    {cart.cartTotalQuantity ? "$30" : "$0"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  $
                  {(
                    1.18 * cart.cartTotalAmount +
                    (cart.cartTotalQuantity &&
                      (cart.cartTotalAmount > 499 ? 0 : 30))
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                <button
                  onClick={initiatePayment}
                  disabled={isDisabled()}
                  className="disabled:bg-gray-500 py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  w-full text-base font-medium leading-4 text-white bg-gray-800 hover:bg-black"
                >
                  Confirm and proceed to payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
