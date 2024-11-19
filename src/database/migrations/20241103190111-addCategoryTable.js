'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('category', { 
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
       },
       name: {
        type: Sequelize.STRING,
        allowNull: false
       },

       createdAt: {
        type: Sequelize.DATE,
        allowNull: false
       },
       updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
       },
       deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null
       },
      }
      );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('category');
  }
};
