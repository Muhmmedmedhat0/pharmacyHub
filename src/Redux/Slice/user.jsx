import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../Routers/ProtectedRoute';

const URL = 'https://e-pharmacy.runasp.net/api/account';

export const logIn = createAsyncThunk(
  'user/logIn',
  async (values, thunkAPI) => {
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
      document.cookie = `id=${data.id}`;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (values, thunkAPI) => {
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
  },
);

// update user data
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token = getCookie('token'); // Retrieve the token
    try {
      const response = await fetch(`${URL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
// change Password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token = getCookie('token'); // Retrieve the token
    try {
      const response = await fetch(`${URL}/ChangePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null, // Changed to null to match the shape of the returned data
    loading: false,
    error: null,
  },
  reducers: {}, // Add any other reducers here if needed
  extraReducers: (builder) => {
    // login
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
      // register
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
      // update user data
      builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // change Password
      builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
