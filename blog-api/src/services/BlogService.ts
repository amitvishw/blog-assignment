import { v4 as uuidv4 } from "uuid";
import BlogModel from "../models/BlogModel";
import { IBlog, IBlogCreateRequest } from "../types/blog";

class BlogService {
  private blogModel: BlogModel;

  constructor() {
    this.blogModel = new BlogModel();
  }

  public async createBlog(data: IBlogCreateRequest): Promise<IBlog> {
    const blog = await this.blogModel.createBlog({
      uuid: uuidv4(),
      ...data,
    });
    return blog;
  }
}

export default BlogService;
