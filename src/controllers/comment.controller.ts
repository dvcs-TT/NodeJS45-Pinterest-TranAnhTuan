import { Request, Response } from "express";

import { prisma } from "../common/prismaClient/init.prisma";

import { responseCode } from "../common/helpers/response.helper";
import { catchError } from "../common/helpers/error.helper";

import validators from "../utils/validators";

const commentsController = {
  // Get a list of comments by image ID
  getCommentsByImgId: async (req: Request, res: Response) => {
    try {
      const id = await validators.isNumber.validateAsync(
        Number(req.params.id),
        { messages: { "number.base": "hinh_id phải là kiểu số" } }
      );

      const commentsData = await prisma.binh_luan.findMany({
        where: { hinh_id: id },
      });

      responseCode.success(
        res,
        commentsData,
        "Lấy thông tin bình luận thành công"
      );
    } catch (err) {
      catchError(err, req, res);
    }
  },

  // Post a comment for a user
  postComment: async (req: Request, res: Response) => {
    try {
      const commentInfo = await validators.comment.validateAsync(req.body, {
        abortEarly: true,
        convert: false,
        stripUnknown: true,
      });
      const postComment = await prisma.binh_luan.create({ data: commentInfo });
      responseCode.created(res, postComment, "Đăng bình luận thành công");
    } catch (err) {
      catchError(err, req, res);
    }
  },
};

export default commentsController;
