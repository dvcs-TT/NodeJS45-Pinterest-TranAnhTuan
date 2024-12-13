import express from "express";
const imagesRoute = express.Router();

// import local controller
import imagesController from "../controllers/image.controller";
import uploadImage from "../utils/uploadImage";

imagesRoute.get("/", imagesController.getImages);
imagesRoute.get("/:id", imagesController.getImagesById);
imagesRoute.get("/search/:name", imagesController.getImagesByName);
imagesRoute.get("/is-saved/:id/:userid", imagesController.isImageSaved);
imagesRoute.post(
  "/upload",
  uploadImage.single("createdImage") as any,
  imagesController.uploadImage
);
imagesRoute.post("/create", imagesController.createImage);
imagesRoute.delete("/delete/:id", imagesController.deleteImage);

export default imagesRoute;
