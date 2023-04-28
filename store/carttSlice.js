import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const data =
  typeof window !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : initialState;
const cartSlice = createSlice({
  name: "cart",
  initialState: data,
  reducers: {
    addToCart(state, actions) {
      try {
        const itemIndex = state.cartItems.findIndex(
          (item) =>
            item._id === actions.payload._id &&
            item.color === actions.payload.color &&
            item.size === actions.payload.size
        );
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].cartQuantity += 1;
          toast.info("increased product quantity", {
            theme: "dark",
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          const tempProduct = { ...actions.payload, cartQuantity: 1 };
          state.cartItems.push(tempProduct);
          toast.success("Product added to cart", {
            theme: "dark",
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        state.cartTotalAmount += actions.payload.price;
        state.cartTotalQuantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
      } catch (error) {
        toast.error("Error adding item in the cart", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    removeFromCart(state, actions) {
      const item = state.cartItems.find(
        (item) =>
          item._id === actions.payload._id &&
          item.color === actions.payload.color &&
          item.size === actions.payload.size
      );
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item._id === actions.payload._id &&
            item.color === actions.payload.color &&
            item.size === actions.payload.size
          )
      );
      toast.info("Successfully removed item from cart", {
        theme: "dark",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      state.cartTotalAmount -= item.price * item.cartQuantity;
      state.cartTotalQuantity -= item.cartQuantity;
      if (state.cartTotalQuantity == 0) {
        state.cartTotalAmount = 0;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    reduceQuantity(state, actions) {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === actions.payload._id &&
          item.color === actions.payload.color &&
          item.size === actions.payload.size
      );
      state.cartTotalAmount -= state.cartItems[itemIndex].price;
      if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) =>
            !(
              item._id === actions.payload._id &&
              item.color === actions.payload.color &&
              item.size === actions.payload.size
            )
        );
        toast.info("Removed item from the cart", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Reduced the quantity", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      state.cartTotalQuantity -= 1;
      if (state.cartTotalQuantity == 0) {
        state.cartTotalAmount = 0;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseQuantity(state, actions) {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === actions.payload._id &&
          item.color === actions.payload.color &&
          item.size === actions.payload.size
      );
      state.cartItems[itemIndex].cartQuantity += 1;
      toast.info("Increased the quantity", {
        theme: "dark",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      state.cartTotalAmount += state.cartItems[itemIndex].price;
      state.cartTotalQuantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart() {
      typeof window !== "undefined" && localStorage.removeItem("cart");
      toast.success("Your cart has been successfully cleared", {
        theme: "dark",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return initialState;
    },
    buyNow(state, actions) {
      try {
        localStorage.removeItem("cart");
        state.cartItems = [];
        state.cartTotalAmount = 0;
        state.cartTotalQuantity = 0;
        const tempProduct = { ...actions.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success("Product added to cart", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        state.cartTotalAmount += actions.payload.price;
        state.cartTotalQuantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
      } catch (error) {
        toast.error("Error adding product added to cart", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    postcheckoutClearcart() {
      typeof window !== "undefined" && localStorage.removeItem("cart");
      return initialState;
    },
  },
});
export const actions = cartSlice.actions;
export default cartSlice;
