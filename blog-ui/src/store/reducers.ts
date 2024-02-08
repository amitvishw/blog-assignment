import { blogSlice } from "../sagas/blogSaga";

const rootReducer = {
  blogState: blogSlice.reducer,
};

export default rootReducer;
