import BookingService from "../../services/user/booking.service.js";


class BookingController {
  // Book a ticket
  static async bookTicket(req, res) {
    const { sourceStationId, destinationStationId, seatCount, trainId } = req.body;
    const user = req.user; 
    const userId = user.dataValues.id;

    try {
      
      const booking = await BookingService.bookTicket(userId, sourceStationId, destinationStationId, seatCount, trainId);

      return res.status(201).json({
        message: 'Booking successful',
        bookingId: booking.bookingId,
        trainId,
        seatCount,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message || 'An error occurred during booking' });
    }
  }
  static async getTrainsAndAvailableSeatsBetweenStations(req, res) {
    const { sourceStationId, destinationStationId } = req.body;

    try {
      const result = await BookingService.getTrainsAndAvailableSeatsBetweenStations(sourceStationId, destinationStationId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }


  static async cancelBooking(req, res) {
    const { bookingId } = req.params;
    const { userId } = req.user;

    try {
      
      const result = await BookingService.cancelBooking(bookingId, userId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Error while canceling booking' });
    }
  }

  static async getBookingById(req, res) {
    const { bookingId } = req.params;
    const  userId  = req.user.dataValues.id;

    try {
      
      const booking = await BookingService.getBookingById(bookingId, userId);

      return res.status(200).json({success: true, booking});
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || 'Error while fetching booking' });
    }
  }

}

export default BookingController;
