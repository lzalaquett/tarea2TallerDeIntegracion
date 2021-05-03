'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('albums', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      artist_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      tracks: {
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