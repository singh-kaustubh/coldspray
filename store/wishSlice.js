import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  wishlistItems: [],
};
const data =
  typeof window !== "undefined" && localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : initialState;
const wishSlice = createSlice({
  name: "wishlist",
  initialState: data,
  reducers: {
    addToWishlist(state, actions) {
      try {
        const itemIndex = state.wishlistItems.findIndex(
          (item) => item._id === actions.payload._id
        );
        if (itemIndex >= 0) {
          toast.info("Product is already in the WishList!", {
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
          const tempProduct = { ...actions.payload };
          state.wishlistItems.push(tempProduct);
          toast.success("Product added to wishlist", {
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
        localStorage.setItem("wishlist", JSON.stringify(state));
      } catch (error) {
        toast.error("Error adding item in the wishlist", {
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
    removeFromWishlist(state, actions) {
      try {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => !(item._id === actions.payload._id)
        );
        toast.info("Successfully removed item from wishlist", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("wishlist", JSON.stringify(state));
      } catch (error) {
        toast.error("Error removing item from wishlist", {
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
    clearWishlist() {
      localStorage.removeItem("wishlist");
      toast.success("Your wishlist has been successfully cleared", {
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
  },
});
export const wishlistActions = wishSlice.actions;
export default wishSlice;
