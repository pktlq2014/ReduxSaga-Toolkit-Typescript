import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import authenticationSlice from './../features/authentication/authenticationSlice';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootSaga from './rootSaga';
import { history } from 'utils';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  router: connectRouter(history),
  counterSlice: counterSlice,
  authenticationSlice: authenticationSlice,
});
// phần này là của saga
export const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   counterSlice: counterSlice,
  //   authenticationSlice: authenticationSlice,
  // },
  // nghĩa là sử dụng middleware default của redux toolkit và thêm thằng middleware của sage vào nữa
  // bước này là của saga và nếu chỉ có toolkit thì bỏ khúc này
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
// nếu toolkit không thì khúc này: export default store; là xong
// tất cả bước ở dưới là của saga
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
