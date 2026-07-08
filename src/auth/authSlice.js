import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  registeredUsers: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const existingUser = state.registeredUsers.find(
        (user) => user.email === email
      );
      if (existingUser) {
        return;
      }
      state.registeredUsers.push({ name, email, password });
    },
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { registerUser, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;