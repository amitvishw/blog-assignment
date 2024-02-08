import express from "express";
import BlogController from "../controllers/BlogController";

const blogRouter = express.Router();

const blogController = new BlogController();

blogRouter.post("/", async (req, res, next) => {
  try {
    const result = await blogController.createBlog(req.body);
    console.log(result);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
