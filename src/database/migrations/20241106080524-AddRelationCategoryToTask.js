'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category_task', {
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      task_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'task',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addConstraint('category_task', {
      fields: ['category_id', 'task_id'],
      type: 'primary key',
      name: 'category_task_pkey',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category_task');
  },
};
