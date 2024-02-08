import express from "express";
import BlogController from "../controllers/BlogController";
import { IBlogFetchRequest } from "../types/blog";

const blogRouter = express.Router();

const blogController = new BlogController();

/**
 * router to handle create blog api /api/blogs
 * @path /api/blogs
 * @method post
 */
blogRouter.post("/", async (req, res, next) => {
  try {
    const result = await blogController.createBlog(req.body);
    console.log(result);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
});

/**
 * router to handle get blogs api /api/blogs
 * @path /api/blogs
 * @method get
 */
blogRouter.get("/", async (req, res, next) => {
  try {
    const result = await blogController.getBlogs(req.query as any);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
});

/**
 * router to handle get blog by id api /api/blogs/:blogId
 * @path /api/blogs/:blogId
 * @method get
 */
blogRouter.get("/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const result = await blogController.getBlogById(blogId);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
