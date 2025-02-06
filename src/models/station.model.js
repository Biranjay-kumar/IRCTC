import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Station extends Model {}

Station.init(
  {
    stationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stationName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    trainIds: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [], 
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Station',
    freezeTableName: true,
    underscored: false,
  }
);

export default Station;
