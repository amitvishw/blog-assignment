import { all } from "redux-saga/effects";
import blogSaga from "./blogSaga";

const rootSaga = function* (): Generator {
  yield all([blogSaga()]);
};

export default rootSaga;
