'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'inProgress', 'completed', 'archived'),
        allowNull: false,
        defaultValue: 'pending'
      },
      assignedTo: {
        type: Sequelize.STRING,
        allowNull: true
      },
       user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user', 
          key: 'id'   
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null
       },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Task');
  }
};
