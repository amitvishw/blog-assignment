import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import API from "./API";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(compression());

app.use("/api", API);

app.get("*", (req, res) => {
  return res.status(404).send({ status: 404, message: "Resource not found." });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("API Error: ", error);
  if (error instanceof SyntaxError) {
    return res
      .status(400)
      .send({ status: 400, message: "Invalid request data." });
  }
  return res
    .status(500)
    .send({ status: 500, message: "Something went wrong." });
});

export default app;
