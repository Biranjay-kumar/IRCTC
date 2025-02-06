import Station from "../../models/station.model.js";

class StationService {

  static async createStation(stationData) {
    return Station.create(stationData);
  }

  static async findStationById(stationId) {
    return Station.findByPk(stationId);
  }

  static async getAllStations() {
    return Station.findAll();
  }

  
  static async updateLocation(stationId, newLocation) {
    const station = await this.findStationById(stationId);
    if (!station) return null;

    station.location = newLocation;
    return station.save();
  }


  static async deleteStation(stationId) {
    const deletedRows = await Station.destroy({ where: { stationId } });
    return deletedRows > 0;
  }

  static async getTrainsBetweenStations(startStation, endStation) {
    try {
      const trains = await TrainStation.findAll({
        where: {
          stationId: {
            [Op.in]: [startStation, endStation],
          },
        },
        include: [Station, Train],
      });

      // Filter trains that exist in both start and end station
      const filteredTrains = trains.filter(train => {
        return train.stationId === startStation || train.stationId === endStation;
      });

      return filteredTrains;
    } catch (error) {
      throw new Error('Error fetching trains');
    }
  }

  static async bookSeat(trainId, stationId) {
    try {
      const trainStation = await TrainStation.findOne({
        where: { trainId, stationId },
      });

      if (trainStation.availableSeats > 0) {
        trainStation.availableSeats -= 1;
        await trainStation.save();
        return { message: 'Seat booked successfully', availableSeats: trainStation.availableSeats };
      } else {
        throw new Error('No seats available');
      }
    } catch (error) {
      throw new Error('Error booking seat');
    }
  }
}

export default StationService;
