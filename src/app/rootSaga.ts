import authenticationSaga from 'features/authentication/authenticationSaga';
import counterSaga from 'features/counter/counterSaga';
import { all } from 'redux-saga/effects';
function* helloSaga() {
  console.log('hello saga');
}
export default function* rootSaga() {
  console.log('sagaRoot');
  yield all([helloSaga(), counterSaga(), authenticationSaga()]);
}
