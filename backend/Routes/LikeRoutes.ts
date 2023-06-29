import express, { NextFunction, Request, Response } from "express";
import { allLikes, like, unlike } from "../Logic/LikeLogic";
import verifyToken from "../MiddleWare/verifyToken";
import Follower from "../Models/Follower";

const router_Likes = express.Router();

router_Likes.get("/allLikes", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const result = await allLikes();
    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router_Likes.post("/like", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const liked: Follower = request.body;
    const result = await like(liked);
    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router_Likes.delete("/unlike", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const unliked: Follower = request.body;
    const result = await unlike(unliked);
    response.status(204).json(result);
  } catch (err) {
    next(err);
  }
});

export default router_Likes;
