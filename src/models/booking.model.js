import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Train from './train.model.js';
import User from './user.model.js';


class Booking extends Model {}

Booking.init(
  {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Train,
        key: 'trainId',
      },
    },
    seatCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'At least one seat must be booked',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Booked',
      validate: {
        isIn: [['Booked', 'Cancelled', 'Completed']],
      },
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Booking',
    freezeTableName: true,
  }
);

export default Booking;
