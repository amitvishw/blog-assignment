export interface IBlog {
  uuid: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlogCreateRequest
  extends Omit<IBlog, "uuid" | "id" | "createdAt" | "updatedAt"> {}

export interface IBlogCreateData
  extends Omit<IBlog, "id" | "createdAt" | "updatedAt"> {}
