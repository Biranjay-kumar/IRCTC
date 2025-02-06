import { Op } from 'sequelize'; 
import Train from '../../models/train.model.js';
import Station from '../../models/station.model.js';
import Booking from '../../models/booking.model.js';
import sequelize from '../../config/database.js';

class BookingService {
  // Book a ticket
  static async bookTicket(userId, sourceStationId, destinationStationId, seatCount, trainId) {
    
    const transaction = await sequelize.transaction();

    try {
      // Step 1: Finding Details of train
      const train = await Train.findByPk(trainId, { transaction });
      if (!train) throw new Error('Train not found');

      // Step 2: Checking that is the train stoppig there or not
      const sourceStation = await Station.findByPk(sourceStationId, { attributes: ['trainIds'], transaction });
      if (!sourceStation || !sourceStation.trainIds.includes(trainId)) {
        throw new Error('This train does not stop at the source station');
      }

      // Step 3: same as step two for destination
      const destinationStation = await Station.findByPk(destinationStationId, { attributes: ['trainIds'], transaction });
      if (!destinationStation || !destinationStation.trainIds.includes(trainId)) {
        throw new Error('This train does not stop at the destination station');
      }

      // Step 4: Checking for availability of trains
      if (train.availableSeats < seatCount) {
        throw new Error('Not enough available seats on this train');
      }

      // Step 5: Decrease available seats atomically using a transaction
      const updatedTrain = await Train.update(
        { availableSeats: sequelize.literal(`"availableSeats" - ${seatCount}`) },
        {
          where: {
            trainId,
            availableSeats: { [Op.gte]: seatCount },
          },
          returning: true, 
          transaction,
        }
      );

      if (updatedTrain[0] === 0) {
        throw new Error('Failed to update available seats');
      }

      // Step 6: Create a booking for the user
      const booking = await Booking.create(
        { userId, trainId, seatCount, status: 'Booked' },
        { transaction }
      );

      // Step 7: Commit the transaction to apply all changes
      await transaction.commit();

      return booking;
    } catch (error) {
      
      await transaction.rollback();
      throw new Error(error.message || 'An error occurred during booking');
    }
  }


  static async getTrainsAndAvailableSeatsBetweenStations(sourceStationId, destinationStationId) {
    const sourceStation = await Station.findByPk(sourceStationId);
    const destinationStation = await Station.findByPk(destinationStationId);

    if (!sourceStation || !destinationStation) {
      throw new Error("Invalid station IDs");
    }

    const sourceTrainIds = sourceStation.trainIds || [];
    const destinationTrainIds = destinationStation.trainIds || [];


    const commonTrainIds = sourceTrainIds.filter(trainId =>
      destinationTrainIds.includes(trainId)
    );


    if (commonTrainIds.length === 0) {
      return { message: "No trains available between these stations" };
    }

    const trains = await Train.findAll({
      where: { trainId: { [Op.in]: commonTrainIds } },
      attributes: ['trainId', 'trainName', 'availableSeats'],
    });

    const trainDetails = trains.map(train => ({
      trainName: train.trainName,
      trainId: train.trainId,
      availableSeats: train.availableSeats,
    }));


    const totalAvailableSeats = trains.reduce((total, train) => total + train.availableSeats, 0);

    return { totalAvailableSeats, trains: trainDetails };
  }

  // Cancel a booking
  static async cancelBooking(bookingId, userId) {
    const booking = await Booking.findOne({ where: { bookingId, userId } });
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== 'Booked') {
      throw new Error("Booking cannot be canceled as it is not in 'Booked' status");
    }

    const transaction = await sequelize.transaction();
    try {
      const train = await Train.findByPk(booking.trainId, { transaction });
      if (!train) throw new Error('Train not found');

      
      train.availableSeats += booking.seatCount;
      await train.save({ transaction });

      booking.status = 'Cancelled';
      await booking.save({ transaction });

      await transaction.commit();

      return {
        message: "Booking canceled successfully",
        bookingId: booking.bookingId,
        status: booking.status,
        availableSeats: train.availableSeats,
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error while canceling booking");
    }
  }
}

export default BookingService;
