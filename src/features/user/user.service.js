const UserRepository = require("./user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    const createData = {
      name: data.name,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    };

    const newUser = await this.userRepository.createUser(createData);
    delete newUser.dataValues.password;
    return newUser.dataValues;
  }

  async getUserById(id) {
    const userData = await this.userRepository.findUserById(id);
    console.log(id)
    if (!userData) throw new Error("User not found");
    delete userData.dataValues.password;
    return userData.dataValues;
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await this.userRepository.findUserByEmail(email);

      if (user) {
        const isPasswordValid = await bcrypt.compare(
          password,
          user.dataValues.password
        );

        const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });

        if (isPasswordValid) {
          return {
            access_token: jwtToken,
          };
        }
      }
      return {
        status: 401,
        message: "Email or password incorrect",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }

  async updateUser(data) {
    const { id, name, email } = data;
    return this.userRepository.updateUser(id, { name, email });
  }

  async deleteUser(id) {
    const result = await this.userRepository.deleteUser(id);
    if (!result) throw new Error("User not found");
    return result;
  }
}

module.exports = UserService;
