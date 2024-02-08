import express from "express";
import blogRouter from "./routers/BlogRouter";

const API = express.Router();

API.use("/blogs", blogRouter);

export default API;
