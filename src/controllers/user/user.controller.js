import UserService from "../../services/user/user.service.js";
import bcrypt from "bcryptjs";

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const existingEmail = await UserService.findUserByEmail(email);
      if (existingEmail) {
        return res
          .status(400)
          .json({ success: false, message: "This user name is taken" });
      }
      const existingUser = await UserService.findUserByUser(username);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "This user name is taken" });
      }

      const newUser = await UserService.createUser({
        username,
        email,
        password,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", userId: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await UserService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(401).json({ message: "Invalid credentials" });
      // }

      const token = UserService.generateToken(user);
      return res
        .status(200)
        .json({ message: "Login successful", data: user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = req.user;
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: true, message: error.message });
    }
  }

  static async adminRegister(req, res) {
    try {
			const admin = req.user;
			if(admin.dataValues.role !== "admin"){
				return res.status(401).json({
					success: false,
					message: "You are not authorized for this action"
				})
			}

      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const role = "admin";

      const existingEmail = await UserService.findUserByEmail(email);
      if (existingEmail) {
        return res
          .status(400)
          .json({ success: false, message: "This user name is taken" });
      }
      const existingUser = await UserService.findUserByUser(username);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "This user name is taken" });
      }

      const newUser = await UserService.createUser({
        username,
        email,
        password,
        role,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", userId: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default UserController;
