'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('albums', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.INTEGER
      },
      artist: {
        type: Sequelize.STRING
      },
      traks: {
        type: Sequelize.STRING
      },
      self: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('albums');
  }
};