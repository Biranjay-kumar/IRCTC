import express from "express";
import TrainController from "../../../controllers/admin/train.controller.js";
import isAdminApiKey from "../../../middlewares/apiKey.middleware.js";
import authMiddleware from "../../../middlewares/verifyToken.middleware.js";

const trainRouter = express.Router();

trainRouter.post("/", authMiddleware, isAdminApiKey, TrainController.create);

trainRouter.get("/", TrainController.getAll);

trainRouter.get("/:trainId", authMiddleware, TrainController.getById);

trainRouter.put(
  "/:trainId",
  authMiddleware,
  isAdminApiKey,
  TrainController.update
);

trainRouter.delete(
  "/:trainId",
  authMiddleware,
  isAdminApiKey,
  TrainController.delete
);

export default trainRouter;
