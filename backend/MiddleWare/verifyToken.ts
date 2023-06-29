import { NextFunction, Request, Response } from "express";
import jwtHelper from "../Helpers/jwt-helper";
import ErrorModel from "../Models/Errors";

const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorizeHeader = request.header("authorization");
  const isTokenValid = await jwtHelper.verifyToken(authorizeHeader);

  if (!isTokenValid) {
    next(new ErrorModel(401, "Invalid or expired token"));
    return;
  }
  next();
};

export default verifyToken;
