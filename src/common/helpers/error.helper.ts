import { Request, Response } from "express";
// import Joi validator
import Joi from "joi";
// import interfaces
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { responseCode } from "./response.helper";

export const catchError = (err: unknown, req: Request, res: Response) => {
  if (err instanceof Joi.ValidationError) {
    responseCode.badRequest(res, "", err.details[0].message);
    return;
  }
  if (err instanceof PrismaClientKnownRequestError) {
    responseCode.badRequest(
      res,
      err.meta ? err.meta : req.body,
      "Bad Request. Please check the request data."
    );
    return;
  }
  responseCode.error(res, "Lỗi Backend");
};
