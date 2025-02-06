import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class TrainStation extends Model {}

TrainStation.init(
  {
    trainId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Train', 
        key: 'trainId',
      },
    },
    stationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Station', 
        key: 'stationId',
      },
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TrainStation',
    freezeTableName: true,
  }
);

export default TrainStation;
