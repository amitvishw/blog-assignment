import { createSlice } from "@reduxjs/toolkit";
import { all, call, put, StrictEffect, takeLatest } from "redux-saga/effects";
import {
  IBlogState,
  IBlog,
  ICreateBlogRequest,
  IFetchBlogsRequest,
} from "../types/blog";
import BlogsAPI from "../api/BlogsAPI";
import { AxiosError } from "axios";

const initialState: IBlogState = {
  blog: null,
  blogs: [],
  totalCount: 0,
  createBlogLoading: false,
  createBlogSuccess: false,
  createBlogError: false,
  createBlogErrorMessage: "",
  fetchBlogByIdLoading: false,
  fetchBlogByIdSuccess: false,
  fetchBlogByIdError: false,
  fetchBlogByIdErrorMessage: "",
  fetchBlogsLoading: false,
  fetchBlogsSuccess: false,
  fetchBlogsError: false,
  fetchBlogsErrorMessage: "",
};

export const blogSlice = createSlice({
  initialState,
  name: "blogSlice",
  reducers: {
    createBlogAction: (state, { payload }) => {
      state.createBlogLoading = true;
      state.createBlogSuccess = false;
      state.createBlogError = false;
    },
    createBlogSuccessAction: (state, { payload }) => {
      state.createBlogLoading = false;
      state.createBlogSuccess = true;
      state.createBlogError = false;
      state.blog = payload;
    },
    createBlogErrorAction: (state, { payload }) => {
      state.createBlogLoading = false;
      state.createBlogSuccess = false;
      state.createBlogError = true;
      state.fetchBlogByIdErrorMessage = payload;
    },
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
      state.createBlogErrorMessage = payload;
    },
    fetchBlogsAction: (state, { payload }) => {
      state.blog = null;
      state.fetchBlogsLoading = true;
      state.fetchBlogsSuccess = false;
      state.fetchBlogsError = false;
    },
    fetchBlogsSuccess: (state, { payload }) => {
      state.fetchBlogsLoading = false;
      state.fetchBlogsSuccess = true;
      state.blogs = payload.blogs;
      state.totalCount = payload.totalCount;
    },
    fetchBlogsError: (state, { payload }) => {
      state.fetchBlogsLoading = false;
      state.fetchBlogsError = true;
      state.fetchBlogsErrorMessage = payload;
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

function* fetchBlogsSaga(action: { payload: IFetchBlogsRequest }): Generator {
  try {
    console.log("0----", action.payload);
    const blog = yield call(BlogsAPI.fetchBlogs, action.payload);
    yield put(blogSlice.actions.fetchBlogsSuccess(blog));
  } catch (error) {
    yield put(
      blogSlice.actions.fetchBlogsError(
        "Failed to fetch blogs, please try again",
      ),
    );
  }
}

export default function* blogSaga() {
  yield all([takeLatest(blogSlice.actions.createBlogAction, createBlogSaga)]);
  yield all([
    takeLatest(blogSlice.actions.fetchBlogByIdAction, fetchBlogByIdSaga),
  ]);
  yield all([takeLatest(blogSlice.actions.fetchBlogsAction, fetchBlogsSaga)]);
}
