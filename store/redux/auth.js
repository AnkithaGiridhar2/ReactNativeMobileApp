import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: false,
    hashedEmail: '',
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.hashedEmail = action.payload.hashedEmail;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
        state.token = '';
        state.isAuthenticated = false;
        state.hashedEmail = '';
    }
  }
});

export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;
export default authSlice.reducer;