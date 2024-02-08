export interface IBlog {
  id: number;
  uuid: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
