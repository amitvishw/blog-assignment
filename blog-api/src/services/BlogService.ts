import { v4 as uuidv4 } from "uuid";
import BlogModel from "../models/BlogModel";
import { IBlog, IBlogCreateRequest } from "../types/blog";
import ResourceNotFound from "../errors/ResourceNotFound";
import RedisCache from "../database/Redis";

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
    await RedisCache.client.set(
      this.getCacheKey(blog.uuid),
      JSON.stringify(blog),
    );
    return blog;
  }

  public async findBlogById(blogId: string): Promise<IBlog> {
    const cacheKey = this.getCacheKey(blogId);
    const cachedBlog = await RedisCache.client.get(cacheKey);

    if (cachedBlog) {
      return JSON.parse(cachedBlog);
    }
    const blog = await this.blogModel.findBlogById(blogId);
    if (!blog) {
      throw new ResourceNotFound("Resource Not Found");
    }
    await RedisCache.client.set(cacheKey, JSON.stringify(blog));
    return blog;
  }

  public async findBlogs(
    pageNumber = 1,
    pageSize = 20,
  ): Promise<{
    blogs: Array<IBlog>;
    totalCount: number;
  }> {
    const offset = (pageNumber - 1) * pageSize;
    return this.blogModel.findBlogs(pageSize, offset);
  }

  private getCacheKey(blogId: string) {
    return `BLOG#${blogId}`;
  }
}

export default BlogService;
