import { configureStore } from "@reduxjs/toolkit";
import cart from "./Slice/CartSlice"; // Importing cartReducer instead of addItem

const store = configureStore({
  reducer: {
    cart, // Using cartReducer instead of CartSlice
  },
});

export default store;
