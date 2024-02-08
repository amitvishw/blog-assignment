import {
  ICreateBlogRequest,
  ICreateBlogResponse,
  IFetchBlogResponse,
  IFetchBlogsRequest,
  IFetchBlogsResponse,
} from "../types/blog";
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

export const fetchBlogById = async (
  blogId: string,
): Promise<IFetchBlogResponse> => {
  return client
    .callApi({
      url: `/blogs/${blogId}`,
      method: "GET",
    })
    .then(({ data }) => data.data);
};

export const fetchBlogs = async (
  params: IFetchBlogsRequest,
): Promise<IFetchBlogsResponse> => {
  return client
    .callApi({
      url: `/blogs`,
      method: "GET",
      params: params,
    })
    .then(({ data }) => data.data);
};

const BlogAPI = {
  createBlog,
  fetchBlogById,
  fetchBlogs,
};

export default BlogAPI;
