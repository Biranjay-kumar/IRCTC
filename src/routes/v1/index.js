import express from "express";
// import bookingRouter from './user/booking.routes.js';
import userRouter from "./user/user.routes.js";
import stationRouter from "./admin/station.routes.js";
import trainRouter from "./admin/train.routes.js";
import bookingRouter from "./user/booking.routes.js";

const router = express.Router();

// Public Routes
// router.use("/booking", bookingRouter);
router.use("/user", userRouter);
router.use("/staion", stationRouter);
router.use("/train", trainRouter);
router.use("/booking", bookingRouter);

export default router;
