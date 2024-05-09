import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../Routers/ProtectedRoute';
const token = getCookie('token');

const URL = 'https://e-pharmacy.runasp.net/api/Basket';

const initialState = {
  cart: {
    id: '',
    items: [],
    totalAmount: 0,
    totalItems: 0, // Add totalItems field
  },
  status: 'idle',
  error: null,
};

// Fetch cart from server
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const USERID = getCookie('id');
    try {
      const response = await fetch(`${URL}?id=${USERID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`, // Include token in the header
        },
      });
      const data = await response.json();
      const totalAmount = data.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      const totalItems = data.items.length;
      data.totalAmount = totalAmount;
      data.totalItems = totalItems; // Assign totalItems to data
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (newItem, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`, // Include token in the header
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${URL}?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`, // Include token in the header
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state, action) => {
        state.status = 'loading';
      });
        builder
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart.items.push(action.payload);
        state.cart.totalAmount += action.payload.price * action.payload.quantity;
        state.cart.totalItems += 1;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== action.payload.id,
        );
        state.cart.totalAmount -= action.payload.price * action.payload.quantity;
        state.cart.totalItems -= 1;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
