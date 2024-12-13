import express from "express";
const rootRoute = express.Router();

// import middlewares
import tokenController from "../controllers/basicToken.controller";

// import local routes
import imagesRoute from "./image.router";
import usersRoute from "./user.router";
import commentsRoute from "./comment.router";

// import controller
import supportController from "../controllers/support.controller";
import usersController from "../controllers/user.controller";

rootRoute.get("/readme", supportController.readme);
rootRoute.post("/signup", usersController.signup);
rootRoute.post("/login", usersController.login);
rootRoute.post("/logout", usersController.logout);
rootRoute.use("/images", tokenController.verify, imagesRoute);
rootRoute.use("/users", tokenController.verify, usersRoute);
rootRoute.use("/comments", tokenController.verify, commentsRoute);

export default rootRoute;
