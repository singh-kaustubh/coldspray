/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { BsBagFill, BsHeart } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImProfile } from "react-icons/im";
import { FiShoppingCart } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMinusCircle, AiOutlineLogin } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import { CgCloseR, CgProfile } from "react-icons/cg";
import { GrPower } from "react-icons/gr";
import { RiCoupon2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { actions } from "../store/carttSlice";
import { wishlistActions } from "../store/wishSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toggleCart = () => {
    setShow(!show);
  };
  const clearCart = () => {
    dispatch(actions.clearCart());
  };
  const handleAdd = (item) => {
    dispatch(actions.increaseQuantity(item));
    return;
  };
  const handleMinus = (item) => {
    dispatch(actions.reduceQuantity(item));
    return;
  };
  const handleRemove = (item) => {
    dispatch(actions.removeFromCart(item));
    return;
  };
  const handleWishlist = (item) => {
    dispatch(wishlistActions.addToWishlist(item));
  };
  const data =
    typeof window !== "undefined" && localStorage.getItem("auth-token");
  const cart = useSelector((state) => state.cart);
  const isDisabled = () => {
    if (cart.cartTotalAmount) {
      return false;
    } else {
      return true;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    toast.success(`Successfully logged out!`, {
      theme: "dark",
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  return (
    <div className="md:fixed lg:fixed z-10 w-full">
      <header className="text-gray-50 bg-stone-800 body-font mb-1 shadow-lg">
        <div className="container mx-auto sm:items-start flex flex-wrap p-3 flex-col md:flex-row md:items-center">
          <Link href={"/"}>
            <a className="flex title-font font-medium items-center text-white md:mb-0 cursor-pointer">
              <Image
                className="items-center"
                src="/images/iitr-banner.png"
                width={400}
                height={50}
                alt="..."
              />
            </a>
          </Link>
          <div className="absolute right-2 items-center space-x-2 md:space-x-4">
            {data ? (
              <button
                className="items-center relative dropdown:block focus:outline-none hover:bg-gray-700 rounded text-base"
                aria-haspopup="true"
              >
                <CgProfile className="text-3xl" />
                <ul
                  className="absolute hidden right-0 text-left text-gray-900 w-auto p-3 mt-3 space-y-2 text-lg bg-white border border-gray-100 rounded-lg shadow-lg"
                  aria-label="submenu"
                >
                  <li>
                    <Link href="/profile">
                      <a className="border-b-2 border-b-gray-400 flex items-center">
                        <ImProfile className="text-lg mx-0.5" />
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/coupons">
                      <a className="border-b-2 border-b-gray-400 flex items-center">
                        <RiCoupon2Line className="text-lg mx-0.5" />
                        Coupons
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/notifications">
                      <a className="border-b-2 border-b-gray-400 flex items-center">
                        <IoMdNotificationsOutline className="text-lg mx-0.5" />
                        Notifications
                      </a>
                    </Link>
                  </li>
                  <li>
                    <div className="border-b-2 border-b-gray-400 flex items-center">
                      <button
                        onClick={handleLogout}
                        className="flex items-center"
                      >
                        <GrPower className="text-lg mx-0.5" />
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </button>
            ) : (
              <button className="items-center focus:outline-none hover:bg-gray-700 rounded text-base">
                <Link href={"/login"}>
                  <AiOutlineLogin className="text-3xl" />
                </Link>
              </button>
            )}
          </div>
        </div>
      </header>
      <div>
        {show && (
          <div
            onBlur={toggleCart}
            className="w-[72%] h-full z-10 fixed bg-opacity-90 top-0 right-0 overflow-y-auto overflow-x-hidden "
            id="chec-div"
          >
            <div
              className="w-full right-0 h-full  transform translate-x-0 transition ease-in-out duration-700"
              id="checkout"
            >
              <div className="flex md:flex-row flex-col justify-end" id="cart">
                <div
                  className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                  id="scroll"
                >
                  <div
                    className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                    onClick={toggleCart}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-chevron-left"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                    <p className="text-sm pl-2 leading-none">Back</p>
                  </div>
                  <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                    Items
                  </p>
                  {cart.cartItems.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="md:flex items-center mt-14 ml-4 py-2 border-t border-gray-200"
                      >
                        <div className="w-1/4">
                          <img
                            src={item.img}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-sm font-black leading-none text-gray-800">
                              <a
                                className="cursor-pointer"
                                href={`/product/${item._id}`}
                              >
                                {item.title}
                              </a>
                            </p>

                            <div className="flex">
                              <button
                                onClick={() => handleMinus(item)}
                                className="cursor-pointer "
                              >
                                <AiOutlineMinusCircle className="text-xl  mt-1 mx-1" />
                              </button>
                              <span className="px-1 border border-gray-900 focus:outline-none">
                                {item.cartQuantity}
                              </span>
                              <button
                                onClick={() => handleAdd(item)}
                                className="cursor-pointer "
                              >
                                <IoAddCircleOutline className="text-xl mt-1 mx-1" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs leading-3 text-gray-600 pt-2">
                            {item.desc.slice(0, 100)}...
                          </p>
                          <div>
                            <ul>
                              <li>
                                {item.size && (
                                  <div>
                                    <b>Size:</b>
                                    {item.size}
                                  </div>
                                )}
                              </li>
                              <li>
                                {item.color && (
                                  <div>
                                    <b>Color:</b>
                                    {item.color}
                                  </div>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center space-x-2 justify-between pt-5 pr-6">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleWishlist(item)}
                                className="flex text-sm  text-white bg-red-900 border-0 px-1 focus:outline-none hover:scale-105 rounded"
                              >
                                Add to WishList
                              </button>
                              <button
                                onClick={() => handleRemove(item)}
                                className="flex text-sm text-white bg-red-900 border-0 px-1 focus:outline-none hover:scale-105 rounded"
                              >
                                Remove from cart
                              </button>
                            </div>
                            <p className="text-base font-black leading-none text-gray-800">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full">
                  <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                    <div>
                      <p className="flex justify-between text-4xl font-black leading-9 text-gray-800">
                        Summary
                        <button onClick={toggleCart}>
                          <CgCloseR className="text-3xl" />
                        </button>
                      </p>
                      <div className="flex items-center justify-between pt-16">
                        <p className="text-base leading-none text-gray-800">
                          Subtotal
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          ${cart.cartTotalAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="text-base leading-none text-gray-800">
                          Shipping
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          ${cart.cartTotalAmount ? 30 : 0}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <p className="text-base leading-none text-gray-800">
                          Tax
                        </p>
                        <p className="text-base leading-none text-gray-800">
                          ${(0.18 * cart.cartTotalAmount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center pb-1 justify-between lg:pt-5 pt-20">
                        <p className="text-2xl leading-normal text-gray-800">
                          Total
                        </p>
                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                          $
                          {(
                            cart.cartTotalAmount +
                            (cart.cartTotalAmount ? 30 : 0) +
                            0.18 * cart.cartTotalAmount
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-justify my-2">
                        Free shipping on orders worth $499 or more at Checkout
                      </div>
                      <div className="flex space-x-4 sm:space-x-1 lg:space-x-1 md:space-x-1">
                        <Link className="flex" href={"/checkout"}>
                          <button
                            onClick={toggleCart}
                            disabled={isDisabled()}
                            className=" disabled:bg-gray-500 flex rounded-lg justify-center text-base leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                          >
                            <BsBagFill className="mr-2" />
                            Checkout
                          </button>
                        </Link>
                        <button
                          onClick={clearCart}
                          className=" flex justify-center rounded-lg text-base leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                        >
                          <BsCartX className="mr-2 text-white" />
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <style>
          {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
        </style>
      </div>
    </div>
  );
}
