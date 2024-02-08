import { v4 as uuidv4 } from "uuid";
import BlogModel from "../models/BlogModel";
import { IBlog, IBlogCreateRequest } from "../types/blog";
import ResourceNotFound from "../errors/ResourceNotFound";

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

  public async findBlogById(blogId: string): Promise<IBlog> {
    const blog = await this.blogModel.findBlogById(blogId);
    if (!blog) {
      throw new ResourceNotFound("Resource Not Found");
    }
    return blog;
  }
}

export default BlogService;
