import express, { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../Logic/AuthLogic";
import { User } from "../Models/User";
import { Login } from "../Models/Login";

const router_Users = express.Router();

router_Users.post("/register", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const newUser: User = new User(request.body);
    const token = await registerUser(newUser);
    response.status(201).json(token);
  } catch (err) {
    next(err);
  }
});

router_Users.post("/login", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const login: Login = new Login(request.body);
    const token = await loginUser(login);
    response.status(200).json(token);
  } catch (err) {
    next(err);
  }
});

export default router_Users;
