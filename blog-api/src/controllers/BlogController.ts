import ResourceNotFound from "../errors/ResourceNotFound";
import BlogService from "../services/BlogService";
import { APIResponse } from "../types/api";
import { IBlogCreateData, IBlogFetchRequest } from "../types/blog";
/**
 * BlogController: controller class to serve api response
 * @constructor
 */
class BlogController {
  private blogService: BlogService;
  constructor() {
    this.blogService = new BlogService();
  }

  /**
   * method to handle create blog api
   * @param blogData IBlogCreateData
   * @returns APIResponse
   */
  public async createBlog(blogData: IBlogCreateData): Promise<APIResponse> {
    const blog = await this.blogService.createBlog(blogData);
    return {
      status: 200,
      data: blog,
    };
  }

  /**
   * method to handle get single blog by id api
   * @param blogId string
   * @returns APIResponse
   */
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

  /**
   * method to handle get paginated blogs api
   * @param pagination IBlogFetchRequest
   * @returns APIResponse
   */
  public async getBlogs(pagination: IBlogFetchRequest): Promise<APIResponse> {
    try {
      const pageNumber = parseInt(pagination.pageNumber);
      const pageSize = parseInt(pagination.pageSize);
      if (isNaN(pageNumber) || isNaN(pageSize)) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const blog = await this.blogService.findBlogs(pageNumber, pageSize);
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
