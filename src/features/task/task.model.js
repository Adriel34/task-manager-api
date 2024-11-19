const { Model, DataTypes, Sequelize } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'inProgress', 'completed', 'archived'),
          allowNull: false,
          defaultValue: 'pending',
        },
        assignedTo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Task',
        tableName: 'task',
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      targetKey: 'id'
    });

    this.belongsToMany(models.Category, {
      through: "category_task",
      foreignKey: "task_id",
      otherKey: "category_id",
      as: "categories",
    });
  }
}

module.exports = Task;