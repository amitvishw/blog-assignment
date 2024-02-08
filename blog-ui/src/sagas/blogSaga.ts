import { createSlice } from "@reduxjs/toolkit";
import { all, call, put, StrictEffect, takeLatest } from "redux-saga/effects";
import { IBlogState, IBlog, ICreateBlogRequest } from "../types/blog";
import BlogsAPI from "../api/BlogsAPI";

const initialState: IBlogState = {
  blog: null,
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

export default function* blogSaga() {
  yield all([takeLatest(blogSlice.actions.createBlogAction, createBlogSaga)]);
}
