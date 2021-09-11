import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take } from '@redux-saga/core/effects';
import { login, LoginPayload, logout } from './authenticationSlice';
function* handleLogin(payload: LoginPayload) {
  console.log('Login', payload);
}
function* handleLogout() {}
function* watchLoginFlow() {
  // khi login -> logout rồi sau đó quay lại login thì phải bỏ vào lặp vô hạn,
  // vì nếu k lặp nó sẽ đứng im ở logout mãi
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
  yield fork(watchLoginFlow);
}
