import { Request } from "express";
import multer, { FileFilterCallback } from "multer";


// UPLOAD & edit name
const storage = multer.diskStorage({
  // Define destination folder
  destination: (req, file, callback) => {
    callback(null, process.cwd() + "/public/img");
  },
  // Rename uploaded file
  filename: (_, file, callback) => {
    const fileName = Date.now() + "_" + file.originalname;
    callback(null, fileName);
  },
});

const fileFilter = (
  _: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploadImage = multer({ storage, fileFilter });
export default uploadImage;
