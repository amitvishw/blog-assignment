import { ICreateBlogRequest, ICreateBlogResponse } from "../types/blog";
import APIClient from "./APIClient";

const client = new APIClient();

export const createBlog = async (
  data: ICreateBlogRequest,
): Promise<ICreateBlogResponse> => {
  return client
    .callApi({
      url: "/blogs",
      method: "POST",
      data,
    })
    .then(({ data }) => data.data);
};

const BlogAPI = {
  createBlog,
};

export default BlogAPI;
