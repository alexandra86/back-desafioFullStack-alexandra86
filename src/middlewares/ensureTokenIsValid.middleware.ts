import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import "dotenv/config";

export const ensureTokenIsValidMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    request.client = {
      id: decoded.sub,
    };

    return next();
  });
};
