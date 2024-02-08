import express from "express";
import BlogController from "../controllers/BlogController";

const blogRouter = express.Router();

const blogController = new BlogController();

export default blogRouter;
