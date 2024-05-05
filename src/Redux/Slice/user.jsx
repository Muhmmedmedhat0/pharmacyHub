import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'http://e-pharmacy.runasp.net/api/account';

export const logIn = createAsyncThunk('user/logIn', async (values, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    document.cookie = `token=${data.token}`;
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

export const register = createAsyncThunk('user/register', async (values, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(`${URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null, // Changed to null to match the shape of the returned data
    loading: false,
    error: null,
  },
  reducers: {}, // Add any other reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
