import StationService from "../../services/admin/station.service.js";

class StationController {
  static async create(req, res) {
    try {
      const { stationName, location } = req.body;

      if (!stationName || !location) {
        return res
          .status(400)
          .json({ message: "Station name and location are required" });
      }

      const station = await StationService.createStation({
        stationName,
        location,
      });
      return res
        .status(201)
        .json({ message: "Station created successfully", station });
    } catch (error) {
      console.error(error); 
      return res.status(500).json({
        message: "Server error",
        error: error.message || "Unknown error occurred",
      });
    }
  }


  static async getAll(req, res) {
    try {
      const stations = await StationService.getAllStations();
      res.status(200).json({ stations });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

 
  static async getById(req, res) {
    try {
      const { stationId } = req.params;
      const station = await StationService.findStationById(stationId);
      if (!station) {
        return res.status(404).json({ message: "Station not found" });
      }
      res.status(200).json({ station });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  static async updateLocation(req, res) {
    try {
      const { stationId } = req.params;
      const { location } = req.body;

      if (!location) {
        return res.status(400).json({ message: "New location is required" });
      }

      const updatedStation = await StationService.updateLocation(
        stationId,
        location
      );
      if (!updatedStation) {
        return res.status(404).json({ message: "Station not found" });
      }

      res
        .status(200)
        .json({ message: "Station location updated", station: updatedStation });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

 
  static async delete(req, res) {
    try {
      const { stationId } = req.params;
      const deleted = await StationService.deleteStation(stationId);

      if (!deleted) {
        return res.status(404).json({ message: "Station not found" });
      }

      res.status(200).json({ message: "Station deleted successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  
}

export default StationController;
