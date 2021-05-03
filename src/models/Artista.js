'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Artista.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    albums: DataTypes.STRING,
    tracks: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'artista',
  });
  return Artista;
};