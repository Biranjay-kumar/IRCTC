import TrainService from "../../services/admin/train.service.js";


class TrainController {
  
  static async create(req, res) {
    try {
      const {
        trainName,
        sourceStationId,
        destinationStationId,
        totalSeats,
        availableSeats,
        stationIds,
      } = req.body;

      // Validate input
      if (
        !trainName ||
        !sourceStationId ||
        !destinationStationId ||
        totalSeats <= 0 ||
        availableSeats < 0
      ) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      // Create train and update stations
      const train = await TrainService.createTrainAndUpdateStations(
        {
          trainName,
          sourceStationId,
          destinationStationId,
          totalSeats,
          availableSeats,
        },
        stationIds
      );

      res
        .status(201)
        .json({
          message: "Train created successfully and stations updated",
          train,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  static async getAll(req, res) {
    try {
      const trains = await TrainService.getAllTrains();
      res.status(200).json({ trains });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  static async getById(req, res) {
    try {
      const { trainId } = req.params;
      const train = await TrainService.getTrainWithStationsById(trainId);
      res.status(200).json({ success: true, train });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }


  static async update(req, res) {
    try {
      const { trainId } = req.params;
      const updatedData = req.body;

      const train = await TrainService.updateTrain(trainId, updatedData);
      res.status(200).json({ message: "Train updated successfully", train });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

 
  static async delete(req, res) {
    try {
      const { trainId } = req.params;

      const result = await TrainService.deleteTrain(trainId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default TrainController;
