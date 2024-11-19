const TaskService = require('./task.service');

jest.mock('./task.repositoty', () => {
  return jest.fn().mockImplementation(() => ({
    createTask: jest.fn(),
    updateUser: jest.fn(),
    getTasksByUser: jest.fn(),
    deleteTask: jest.fn(),
  }));
});

describe('TaskService', () => {
  let taskService;
  let taskRepositoryMock;

  beforeEach(() => {
    taskService = new TaskService();
    taskRepositoryMock = taskService.taskRepository;
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const taskData = {
        description: 'Test task',
        status: 'pending',
        assignedTo: 'user1',
        user_id: 1,
        categoryIds: [101, 102],
      };
      const createdTask = { id: 1, ...taskData };

      taskRepositoryMock.createTask.mockResolvedValue(createdTask);

      const result = await taskService.createTask(taskData);

      expect(taskRepositoryMock.createTask).toHaveBeenCalledWith(
        {
          description: 'Test task',
          status: 'pending',
          assignedTo: 'user1',
          user_id: 1,
        },
        [101, 102]
      );
      expect(result).toEqual(createdTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const taskUpdateData = {
        id: 1,
        description: 'Updated task description',
        status: 'completed',
      };
      const updatedTask = {
        dataValues: {
          id: 1,
          description: 'Updated task description',
          status: 'completed',
        },
      };

      taskRepositoryMock.updateUser.mockResolvedValue(updatedTask);

      const result = await taskService.updateTask({ body: taskUpdateData });

      expect(taskRepositoryMock.updateUser).toHaveBeenCalledWith(1, {
        description: 'Updated task description',
        status: 'completed',
      });
      expect(result).toEqual(updatedTask.dataValues);
    });
  });

  describe('getTasksByUser', () => {
    it('should return tasks for a specific user', async () => {
      const userId = 1;
      const userTasks = [
        { id: 1, description: 'Task 1', user_id: 1 },
        { id: 2, description: 'Task 2', user_id: 1 },
      ];

      taskRepositoryMock.getTasksByUser.mockResolvedValue(userTasks);

      const result = await taskService.getTasksByUser(userId);

      expect(taskRepositoryMock.getTasksByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(userTasks);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const taskId = 1;
      const deleteResult = { message: 'Task deleted successfully' };

      taskRepositoryMock.deleteTask.mockResolvedValue(deleteResult);

      const result = await taskService.deleteTask(taskId);

      expect(taskRepositoryMock.deleteTask).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(deleteResult);
    });
  });
});
