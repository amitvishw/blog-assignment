import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/sagas";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const configureReduxStore = () => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    reducer: rootReducer,
    devTools: true,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureReduxStore;
