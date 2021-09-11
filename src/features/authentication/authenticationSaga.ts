import { User } from './../../models/user';
import { City } from './../../models/city';
import { ListResponse } from './../../models/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, select, take, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { login, loginFailed, LoginPayload, loginSuccess, logout } from './authenticationSlice';
import cityApi from 'api/cityApi';
import { useHistory } from 'react-router';
import { push } from 'connected-react-router';
function* handleLogin(payload: LoginPayload) {
  console.log('Login', payload);
  const res: ListResponse<City> = yield call(cityApi.getAll);
  console.log('Respon ne: ', res);
  // res.status === 200 thì dispatch array vào reducer
}
export interface AuthenticationState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}
function* handleLoginTakeLatest(action: PayloadAction<LoginPayload>) {
  try {
    console.log('Login', action);
    const res: ListResponse<City> = yield call(cityApi.getAll);
    console.log('Respon ne 123: ', res);
    localStorage.setItem('accessToken', 'accessToken');
    yield put(
      loginSuccess({
        id: 1,
        name: 'Nguyen Van Ty',
      })
    );
    const store: AuthenticationState = yield select((state) => state.authenticationSlice);
    console.log(store);
    yield put(push('/admin'));
    // res.status === 200 thì dispatch array vào reducer
  } catch (error) {
    yield put(loginFailed('Loi'));
  }
}
function* handleLogout() {
  localStorage.removeItem('accessToken');
  yield put(push('/'));
}
function* watchLoginFlow() {
  // khi login -> logout rồi sau đó quay lại login thì phải bỏ vào lặp vô hạn,
  // vì nếu k lặp nó sẽ đứng im ở logout mãi
  // Khi dùng take bắt buộc phải bỏ trong vòng lặp vô hạn
  while (true) {
    // đợi đến khi nào user dispatch 1 action login lên thì mới làm gì đấy,còn user
    // không dispatch action login thì đứng im tại dòng này không làm gì cả
    const action: PayloadAction<LoginPayload> = yield take(login.type);
    yield fork(handleLogin, action.payload);
    // sau khi dispatch action login thì tiếp tục dừng ở dòng này đợi user dispatch
    // action logout, nếu user k logout mà login nữa thì k thực thi login nữa
    // đợi đến khi nào user dispatch 1 action logout lên thì mới làm gì đấy,còn user
    // không dispatch action logout thì đứng im tại dòng này không làm gì cả
    yield take(logout.type);
    yield fork(handleLogout);
  }
}
export default function* authenticationSaga() {
  console.log('Auth saga');
  // yield fork(watchLoginFlow);
  yield takeLatest(login.type, handleLoginTakeLatest);
  yield takeLatest(logout.type, handleLogout);
}
