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

export interface IBlogState {
  blog: IBlog | null;
  fetchBlogByIdLoading: boolean;
  fetchBlogByIdSuccess: boolean;
  fetchBlogByIdError: boolean;
  fetchBlogByIdErrorMessage: string;
}
