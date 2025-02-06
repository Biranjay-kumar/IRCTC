import Station from "../../models/station.model.js";
import Train from "../../models/train.model.js";

class TrainService {
  static async createTrainAndUpdateStations(trainData, stationIds) {
    try {
      const newTrain = await Train.create(trainData);
      for (const stationId of stationIds) {
        const station = await Station.findByPk(stationId);

        if (station) {
          const updatedTrainIds = Array.isArray(station.trainIds)
            ? [...station.trainIds, newTrain.trainId]
            : [newTrain.trainId];
          station.trainIds = updatedTrainIds;
          await station.save();
        }
      }
      return newTrain;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get all trains
  static async getAllTrains() {
    try {
      const trains = await Train.findAll();
      return trains;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getTrainWithStationsById(trainId) {
    try {
      // Fetch the train by its ID directly
      const train = await Train.findByPk(trainId, {
        attributes: [
          "trainId",
          "trainName",
          "totalSeats",
          "availableSeats",
          "sourceStationId",
          "destinationStationId",
        ],
      });

      // If the train doesn't exist, throw an error
      if (!train) {
        throw new Error("Train not found!");
      }

      // Fetch the station names based on the station IDs
      const sourceStation = await Station.findByPk(train.sourceStationId, {
        attributes: ["stationName"],
      });
      const destinationStation = await Station.findByPk(
        train.destinationStationId,
        {
          attributes: ["stationName"],
        }
      );

      if (!sourceStation || !destinationStation) {
        throw new Error("Station not found!");
      }

      // Return train details along with station names
      return {
        trainId: train.trainId,
        trainName: train.trainName,
        totalSeats: train.totalSeats,
        availableSeats: train.availableSeats,
        sourceStation: sourceStation.stationName,
        destinationStation: destinationStation.stationName,
      };
    } catch (error) {
      throw new Error(
        `Error fetching train and station data: ${error.message}`
      );
    }
  }

  // Update a train's information
  static async updateTrain(trainId, updatedData) {
    try {
      const train = await Train.findByPk(trainId);

      if (!train) {
        throw new Error("Train not found");
      }

      // Update the train
      await train.update(updatedData);
      return train;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete a train
  static async deleteTrain(trainId) {
    try {
      const train = await Train.findByPk(trainId);

      if (!train) {
        throw new Error("Train not found");
      }

      // Delete the train
      await train.destroy();
      return { message: "Train deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TrainService;
