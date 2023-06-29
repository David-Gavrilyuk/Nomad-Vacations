import { NextFunction, Request, Response } from "express";
import jwtHelper from "../Helpers/jwt-helper";
import ErrorModel from "../Models/Errors";
import Role from "../Models/Role";

const verifyAdmin = (request: Request, response: Response, next: NextFunction): void => {
  const authorizeHeader = request.header("authorization");

  const user = jwtHelper.getUserFromToken(authorizeHeader);

  if (user[0].role !== Role.Admin) {
    console.log(user[0].role);
    next(new ErrorModel(403, "You are not authorized to preform this action"));
    return;
  }

  next();
};

export default verifyAdmin;
