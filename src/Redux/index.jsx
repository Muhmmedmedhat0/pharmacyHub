import { configureStore } from '@reduxjs/toolkit';
import cart from './Slice/CartSlice';
import user from './Slice/user';

const store = configureStore({
  reducer: {
    cart,
    user,
  },
});

export default store;
