const User = require('./user.model');

class UserRepository {
    async createUser(data) {
        return await User.create(data);
    }

    async findUserById(id) {
        return User.findByPk(id);
    }

    async findUserByEmail(email) {
        return User.findOne({
          where: {
            email,
          },
        });
      }

    async updateUser(id, data) {
        const user = await User.findByPk(id);  
        return user.update(data);
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        return user.destroy();
    }

}

module.exports = UserRepository;
