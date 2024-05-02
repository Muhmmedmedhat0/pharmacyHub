import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../Routers/ProtectedRoute';

const URL = 'http://e-pharmacy.runasp.net/api/Basket';
const USERID = getCookie('id');

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
    try {
      const response = await fetch(`${URL}?id=${USERID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
      const data = await response.json();
      const totalAmount = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalItems = data.items.reduce((acc, item) => acc + item.quantity, 0); // Calculate total items
      data.totalAmount = totalAmount;
      data.totalItems = totalItems; // Assign totalItems to data
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Add item to cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (newItem, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const state = getState();
      const currentCart = state.cart.cart;

      const updatedCart = {
        id: currentCart.id,
        items: [...currentCart.items, newItem],
      };

      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(updatedCart),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${URL}?id=${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorMessage = await response.text(); // Get error message from response body
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // Return a serializable value (e.g., error message string)
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
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
