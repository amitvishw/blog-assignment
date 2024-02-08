import BlogModel from "../models/BlogModel";

class BlogService {
  private blogModel: BlogModel;

  constructor() {
    this.blogModel = new BlogModel();
  }
}

export default BlogService;
