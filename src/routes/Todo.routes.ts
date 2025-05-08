import { Router , Request , Response } from "express";

const todoRouter = Router();

todoRouter.get("/", (req:Request  , res:Response) => {
  res.send("Todos");
});

export default todoRouter;