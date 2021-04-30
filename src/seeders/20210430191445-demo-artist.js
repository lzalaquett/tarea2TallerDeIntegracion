'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('artista', [{
     artistaId: '0001',
     name: 'Parafraseo',
     age: 20,
     albums: 'www.url.com/artists/0001/albums',
     traks: 'www.url.com/artists/0001/traks',
     self: 'www.url.com/artists/0001',
     createdAt: new Date(),
     updatedAt: new Date(),
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('artista', null, {});
  }
};
