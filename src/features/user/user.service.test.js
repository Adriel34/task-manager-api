const UserService = require('./user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('./user.repository', () => {
  return jest.fn().mockImplementation(() => ({
    createUser: jest.fn(),
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  }));
});

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return it without the password', async () => {
      const mockData = { name: 'John', email: 'john@example.com', password: '123456' };
      const hashedPassword = 'hashedPassword123';
      const createdUser = {
        dataValues: { id: 1, name: 'John', email: 'john@example.com', password: hashedPassword },
      };

      bcrypt.hash.mockResolvedValue(hashedPassword);
      userService.userRepository.createUser.mockResolvedValue(createdUser);

      const result = await userService.createUser(mockData);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockData.password, 10);
      expect(userService.userRepository.createUser).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
        password: hashedPassword,
      });
      expect(result).toEqual({ id: 1, name: 'John', email: 'john@example.com' });
    });
  });

  describe('getUserById', () => {
    it('should return user data without the password', async () => {
      const userId = 1;
      const user = {
        dataValues: { id: 1, name: 'John', email: 'john@example.com', password: 'hashedPassword' },
      };

      userService.userRepository.findUserById.mockResolvedValue(user);

      const result = await userService.getUserById(userId);

      expect(userService.userRepository.findUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ id: 1, name: 'John', email: 'john@example.com' });
    });

    it('should throw an error if user is not found', async () => {
      userService.userRepository.findUserById.mockResolvedValue(null);

      await expect(userService.getUserById(999)).rejects.toThrow('User not found');
    });
  });

  describe('login', () => {
    it('should return a token if login is successful', async () => {
      const loginData = { email: 'john@example.com', password: '123456' };
      const user = {
        id: 1,
        dataValues: { email: 'john@example.com', password: 'hashedPassword' },
      };
      const token = 'mockToken123';

      userService.userRepository.findUserByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);

      const result = await userService.login(loginData);

      expect(userService.userRepository.findUserByEmail).toHaveBeenCalledWith(loginData.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '5h' });
      expect(result).toEqual({ access_token: token });
    });

    it('should return a 401 error if login fails', async () => {
      const loginData = { email: 'john@example.com', password: 'wrongPassword' };
      const user = {
        dataValues: { email: 'john@example.com', password: 'hashedPassword' },
      };

      userService.userRepository.findUserByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      const result = await userService.login(loginData);

      expect(result).toEqual({ status: 401, message: 'Email or password incorrect' });
    });
  });

  describe('updateUser', () => {
    it('should update user data', async () => {
      const updateData = { id: 1, name: 'John Updated', email: 'john.updated@example.com' };

      userService.userRepository.updateUser.mockResolvedValue(true);

      const result = await userService.updateUser(updateData);

      expect(userService.userRepository.updateUser).toHaveBeenCalledWith(1, {
        name: 'John Updated',
        email: 'john.updated@example.com',
      });
      expect(result).toBe(true);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 1;

      userService.userRepository.deleteUser.mockResolvedValue(true);

      const result = await userService.deleteUser(userId);

      expect(userService.userRepository.deleteUser).toHaveBeenCalledWith(userId);
      expect(result).toBe(true);
    });

    it('should throw an error if user is not found', async () => {
      userService.userRepository.deleteUser.mockResolvedValue(false);

      await expect(userService.deleteUser(999)).rejects.toThrow('User not found');
    });
  });
});
