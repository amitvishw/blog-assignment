export interface IBlog {
  id: number;
  uuid: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBlogRequest
  extends Omit<IBlog, "id" | "uuid" | "createdAt" | "updatedAt"> {}

export interface ICreateBlogResponse extends IBlog {}

export interface IFetchBlogResponse extends IBlog {}

export interface IFetchBlogsRequest {
  pageNumber: number;
  pageSize: number;
}

export interface IFetchBlogsResponse {
  blogs: Array<IBlog>;
  totalCount: number;
}

export interface IBlogState {
  blog: IBlog | null;
  blogs: Array<IBlog>;
  totalCount: number;
  fetchBlogByIdLoading: boolean;
  fetchBlogByIdSuccess: boolean;
  fetchBlogByIdError: boolean;
  fetchBlogByIdErrorMessage: string;
  fetchBlogsLoading: boolean;
  fetchBlogsSuccess: boolean;
  fetchBlogsError: boolean;
  fetchBlogsErrorMessage: string;
}
