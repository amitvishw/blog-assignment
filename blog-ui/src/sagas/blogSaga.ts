import { createSlice } from "@reduxjs/toolkit";
import { all, call, put, StrictEffect, takeLatest } from "redux-saga/effects";
import { IBlogState, IBlog, ICreateBlogRequest } from "../types/blog";
import BlogsAPI from "../api/BlogsAPI";
import { AxiosError, AxiosResponse } from "axios";

const initialState: IBlogState = {
  blog: null,
  fetchBlogByIdLoading: false,
  fetchBlogByIdSuccess: false,
  fetchBlogByIdError: false,
  fetchBlogByIdErrorMessage: "",
};

export const blogSlice = createSlice({
  initialState,
  name: "blogSlice",
  reducers: {
    createBlogAction: (state, { payload }) => {},
    createBlogSuccessAction: (state, { payload }) => {
      state.blog = payload;
    },
    createBlogErrorAction: (state, { payload }) => {},
    fetchBlogByIdAction: (state, { payload }) => {
      state.blog = null;
      state.fetchBlogByIdLoading = true;
      state.fetchBlogByIdSuccess = false;
      state.fetchBlogByIdError = false;
    },
    fetchBlogByIdSuccess: (state, { payload }) => {
      state.fetchBlogByIdLoading = false;
      state.fetchBlogByIdSuccess = true;
      state.blog = payload;
    },
    fetchBlogByIdError: (state, { payload }) => {
      state.fetchBlogByIdLoading = false;
      state.fetchBlogByIdError = true;
      state.fetchBlogByIdErrorMessage = payload;
    },
  },
});

function* createBlogSaga(action: {
  payload: ICreateBlogRequest;
}): Generator<StrictEffect, void, IBlog> {
  try {
    const blog = yield call(BlogsAPI.createBlog, action.payload);
    yield put(blogSlice.actions.createBlogSuccessAction(blog));
  } catch (error) {
    yield put(blogSlice.actions.createBlogErrorAction(""));
  }
}

function* fetchBlogByIdSaga(action: {
  payload: string;
}): Generator<StrictEffect, void, IBlog> {
  try {
    const blog = yield call(BlogsAPI.fetchBlogById, action.payload);
    yield put(blogSlice.actions.fetchBlogByIdSuccess(blog));
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      yield put(blogSlice.actions.fetchBlogByIdError("Blog does not exists"));
    } else {
      yield put(
        blogSlice.actions.fetchBlogByIdError(
          "Failed to fetch blog, please try again",
        ),
      );
    }
  }
}
export default function* blogSaga() {
  yield all([takeLatest(blogSlice.actions.createBlogAction, createBlogSaga)]);
  yield all([
    takeLatest(blogSlice.actions.fetchBlogByIdAction, fetchBlogByIdSaga),
  ]);
}
