import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./carttSlice";
import wishSlice from "./wishSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishSlice.reducer,
  },
});

export default store;
