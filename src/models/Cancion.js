'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cancion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cancion.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    album_id: DataTypes.STRING,
    artist_id: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.FLOAT,
    times_played: DataTypes.INTEGER,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cancion',
  });
  return Cancion;
};