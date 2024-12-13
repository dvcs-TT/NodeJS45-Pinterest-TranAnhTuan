import { Request, Response } from "express";
import "dotenv/config";

import { prisma } from "../common/prismaClient/init.prisma";

import { responseCode } from "../common/helpers/response.helper";
import { catchError } from "../common/helpers/error.helper";

import validators from "../utils/validators";

import { getFileUrl } from "../utils/getFileUrl";

const imagesController = {
  // Get all images
  getImages: async (_: Request, res: Response) => {
    try {
      const imagesData = await prisma.hinh_anh.findMany();
      responseCode.success(res, imagesData, "Lấy danh sách ảnh thành công");
    } catch (err) {
      responseCode.error(res, "Lỗi Backend");
    }
  },

  // Get images by name
  getImagesByName: async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const imagesData = await prisma.hinh_anh.findMany({
        where: { ten_hinh: { contains: name } },
      });

      responseCode.success(res, imagesData, "Lấy danh sách ảnh thành công");
    } catch (err) {
      responseCode.error(res, "Lỗi Backend");
    }
  },

  // Get image by id
  getImagesById: async (req: Request, res: Response) => {
    try {
      const id = await validators.isNumber.validateAsync(
        Number(req.params.id),
        { messages: { "number.base": "hinh_id phải là kiểu số" } }
      );

      const imageInfo = await prisma.hinh_anh.findFirst({
        where: { hinh_id: id },
        include: {
          nguoi_dung: {
            select: {
              nguoi_dung_id: true,
              email: true,
              ho_ten: true,
              tuoi: true,
              anh_dai_dien: true,
            },
          },
        },
      });

      if (!imageInfo) {
        responseCode.notFound(res, { id }, "Không tìm thấy hình ảnh");
        return;
      }
      responseCode.success(res, imageInfo, "Lấy thông tin ảnh thành công");
    } catch (err) {
      catchError(err, req, res);
    }
  },

  // Check if an image is saved
  isImageSaved: async (req: Request, res: Response) => {
    try {
      const { id, userid } = req.params;

      const savedImgData = await prisma.luu_anh.findFirst({
        where: {
          hinh_id: Number(id),
          nguoi_dung_id: Number(userid),
        },
      });

      responseCode.success(
        res,
        { isSaved: savedImgData ? true : false },
        "Success"
      );
    } catch (err) {
      responseCode.error(res, "Lỗi Backend");
    }
  },

  // Delete an image by ID
  deleteImage: async (req: Request, res: Response) => {
    try {
      const id = await validators.isNumber.validateAsync(
        Number(req.params.id),
        { messages: { "number.base": "hinh_id phải là kiểu số" } }
      );

      const result = await prisma.hinh_anh.delete({ where: { hinh_id: id } });
      responseCode.success(res, result, "Xóa hình thành công");
    } catch (err) {
      catchError(err, req, res);
    }
  },

  // UPLOAD an image
  uploadImage: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        responseCode.badRequest(
          res,
          "",
          "Định dạng file không hợp lệ. Phải là png/jpg/jpeg/webp"
        );
        return;
      }
      responseCode.success(
        res,
        {
          imageURL: getFileUrl(req, process.env.IMAGE_URL!, req.file.filename),
        },
        "Upload file thành công"
      );
    } catch (err) {
      catchError(err, req, res);
    }
  },

  // Post one more image with info for a user
  createImage: async (req: Request, res: Response) => {
    try {
      const newImage = await validators.image.validateAsync(req.body, {
        abortEarly: true,
        stripUnknown: true,
      });

      const result = await prisma.hinh_anh.create({ data: newImage });
      responseCode.created(res, result, "Tạo hình ảnh thành công");
    } catch (err) {
      catchError(err, req, res);
    }
  },
};

export default imagesController;
