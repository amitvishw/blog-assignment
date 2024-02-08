import BlogService from "../services/BlogService";
import { APIResponse } from "../types/api";
import { IBlogCreateData } from "../types/blog";

class BlogController {
  private blogService: BlogService;
  constructor() {
    this.blogService = new BlogService();
  }

  public async createBlog(blogData: IBlogCreateData): Promise<APIResponse> {
    const blog = await this.blogService.createBlog(blogData);
    return {
      status: 200,
      data: blog,
    };
  }
}

export default BlogController;
