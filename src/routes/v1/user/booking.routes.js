import express from "express";
import BookingController from "../../../controllers/user/booking.controller.js";
import authMiddleware from "../../../middlewares/verifyToken.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleware, BookingController.bookTicket);
bookingRouter.post(
  "/empty-slots",
  authMiddleware,
  BookingController.getTrainsAndAvailableSeatsBetweenStations
);
bookingRouter.delete(
  "/:bookingId",
  authMiddleware,
  BookingController.cancelBooking
);

bookingRouter.get("/:bookingId", authMiddleware, BookingController.getBookingById);
export default bookingRouter;
