const UserService = require("./user.service");
const jwt = require("jsonwebtoken");

class UserController {
  userService = new UserService();

  login = async (req, res) => {
    const { email, password } = req.body;
    const result = await this.userService.login({ email, password });
    if (result.status === 401) {
        return res.status(401).json({ status: 401, message: result.message });
      }
    return res.status(200).json(result);
  };

  createUser = async (req, res) => {
    const { email, name, password } = req.body;
    const teste = await this.userService.createUser({ email, name, password });
    return res.json(teste);
  };

  updateUser = async (req, res) => {
    const { id, email, name } = req.body;
    const updatedUser = await this.userService.updateUser({ id, email, name });
    return res.json({...updatedUser.dataValues, password: undefined});
  };

  getUserById = async (req, res) => {
    const authHeader = req.headers['authorization'];
  
        const decoded = jwt.verify(authHeader.split(' ')[1], "obuc");
        const user = await this.userService.getUserById(decoded.userId);
    return res.json(user);
  };
}

module.exports = new UserController();
