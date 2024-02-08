import ResourceNotFound from "../errors/ResourceNotFound";
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

  public async getBlogById(blogId: string): Promise<APIResponse> {
    try {
      const blog = await this.blogService.findBlogById(blogId);
      return {
        status: 200,
        data: blog,
      };
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        return {
          status: 404,
          message: error.message,
        };
      }
      throw error;
    }
  }
}

export default BlogController;
