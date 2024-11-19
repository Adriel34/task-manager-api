const CategoryService = require('./category.service');

jest.mock('./category.repository', () => {
  return jest.fn().mockImplementation(() => ({
    createTask: jest.fn(),
    updateCategory: jest.fn(),
    getCategoriesByUser: jest.fn(),
    deleteCategory: jest.fn(),
  }));
});

describe('CategoryService', () => {
  let categoryService;
  let categoryRepositoryMock;

  beforeEach(() => {
    categoryService = new CategoryService();
    categoryRepositoryMock = categoryService.categoryRepository;
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a category successfully', async () => {
      const categoryData = { name: 'New Category' };
      const createdCategory = { id: 1, name: 'New Category' };

      categoryRepositoryMock.createTask.mockResolvedValue(createdCategory);

      const result = await categoryService.createCategory(categoryData);

      expect(categoryRepositoryMock.createTask).toHaveBeenCalledWith({ name: 'New Category' });
      expect(result).toEqual(createdCategory);
    });
  });

  describe('updateCategory', () => {
    it('should update a category successfully', async () => {
      const categoryUpdateData = {
        id: 1,
        name: 'Updated Category',
      };
      const updatedCategory = {
        dataValues: {
          id: 1,
          name: 'Updated Category',
        },
      };

      categoryRepositoryMock.updateCategory.mockResolvedValue(updatedCategory);

      const result = await categoryService.updateCategory(categoryUpdateData);

      expect(categoryRepositoryMock.updateCategory).toHaveBeenCalledWith(1, {
        name: 'Updated Category',
      });
      expect(result).toEqual(updatedCategory.dataValues);
    });
  });

  describe('getCategoriesByUser', () => {
    it('should return categories for a specific user', async () => {
      const userId = 1;
      const userCategories = [
        { id: 1, name: 'Category 1', user_id: 1 },
        { id: 2, name: 'Category 2', user_id: 1 },
      ];

      categoryRepositoryMock.getCategoriesByUser.mockResolvedValue(userCategories);

      const result = await categoryService.getCategoriesByUser(userId);

      expect(categoryRepositoryMock.getCategoriesByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(userCategories);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category successfully', async () => {
      const categoryId = 1;

      const deleteResult = {
        id: categoryId,
        name: 'Category to Delete',
        destroy: jest.fn().mockResolvedValue(true),
      };
      categoryRepositoryMock.deleteCategory.mockResolvedValue(deleteResult);

      const result = await categoryService.deleteCategory(categoryId);

      expect(categoryRepositoryMock.deleteCategory).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(deleteResult);
    });
  });
});
