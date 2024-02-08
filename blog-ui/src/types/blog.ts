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
