import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Train extends Model {
  // Basic structure of the model with validation
}

Train.init(
  {
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trainName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sourceStationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Station', 
        key: 'stationId',  
      },
    },
    destinationStationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Station', 
        key: 'stationId',  
      },
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Train',
    freezeTableName: true,
    underscored: false,
    validate: {
      availableNotExceedTotal() {
        if (this.availableSeats > this.totalSeats) {
          throw new Error('Available seats cannot exceed total seats.');
        }
      },
    },
  }
);


Train.associate = (models) => {
  Train.belongsTo(models.Station, {
    as: 'sourceStation',
    foreignKey: 'sourceStationId',
  });
  Train.belongsTo(models.Station, {
    as: 'destinationStation',
    foreignKey: 'destinationStationId',
  });
};

export default Train;
