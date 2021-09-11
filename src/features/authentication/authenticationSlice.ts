import { RootState } from './../../app/store';
import { User } from './../../models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface AuthenticationState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}
export interface LoginPayload {
  username: string;
  password: string;
}
const initialState: AuthenticationState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
      alert('123');
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});
// toolkit hỗ trở 3 cái: actions, reducer và selector
const { actions, reducer } = authenticationSlice;
export const { login, loginSuccess, loginFailed, logout } = actions;
// selector
export const selectIsLoggedIn = (state: RootState) => state.authenticationSlice.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.authenticationSlice.logging;
export default reducer;
