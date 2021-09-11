import { delay, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';
// export function* log(action: PayloadAction) {
//   console.log('log', action);
// }
function* handleIncreamentSaga(action: PayloadAction<number>) {
  console.log('222');
  console.log(action);

  console.log('Waiting 2s');
  yield delay(2000);
  console.log('Waiting done, dispatch action');
  yield put(incrementSagaSuccess(action.payload));
}
export default function* counterSaga() {
  console.log('counter saga');
  // mỗi lần có action được dispatch lên sẽ log cái action này ra
  // action nào cũng được, nó cũng sẽ lắng nghe cả
  //yield takeEvery('*', handleIncreamentSaga);
  // trường hợp chỉ muốn lắng nghe 1 action nào đó mình muốn thôi thì để như sau
  // yield takeEvery(incrementSaga.toString(), handleIncreamentSaga);
  yield takeLatest(incrementSaga.toString(), handleIncreamentSaga);
}
