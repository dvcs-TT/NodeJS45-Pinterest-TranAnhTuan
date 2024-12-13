import express from "express";
const commentsRoute = express.Router();

// import local controller
import commentsController from "../controllers/comment.controller";

commentsRoute.get("/image/:id", commentsController.getCommentsByImgId);
commentsRoute.post("/post", commentsController.postComment);

export default commentsRoute;
