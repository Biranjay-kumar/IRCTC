import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
// import { User } from '../models/index.js';

class UserService {
  static async hashPassword(password) {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async createUser(userData) {
    try {
      userData.password = await this.hashPassword(userData.password);
      return User.create(userData);
    } catch (error) {
      return resizeBy.status(500).json({
        success: false,
        message: "sever side error",
        error: error.message,
      });
    }
  }

  static async validatePassword(enteredPassword, storedHash) {
    return bcrypt.compare(enteredPassword, storedHash);
  }
	
  static async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static async findUserByUser(username) {
    return User.findOne({ where: { username } });
  }

  static generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
}

export default UserService;
