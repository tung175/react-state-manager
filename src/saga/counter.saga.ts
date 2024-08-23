import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  decrementSagaFinish,
  incrementSagaFinish,
} from "../redux/counter/counter.slide";

function* handleIncrement(action: any) {
  console.log(action);
  //   yield delay(200);
  // yield put({
  //   type: "counter/incrementSagaFinish",
  //   payload: { value: 2 },
  // });
  yield put(incrementSagaFinish({ value: 2 }));
}

function* handleDecrement(action: any) {
  console.log(action);
  //   yield delay(200);
  // yield put({
  //   type: "counter/decrementSagaFinish",
  //   payload: { value: 2 },
  // });
  yield put(decrementSagaFinish({ value: 2 }));
}

function* counterSaga() {
  //lấy tất cả các action kể cả khi chưa hoàn thành delay
  // yield takeEvery("counter/incrementSagaStart", handleIncrement)

  // lấy action cuối cùng
  yield takeLatest("counter/incrementSagaStart", handleIncrement);
  yield takeLatest("counter/decrementSagaStart", handleDecrement);
}

export default counterSaga;
