'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Album.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    genre: DataTypes.INTEGER,
    artist: DataTypes.STRING,
    traks: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'album',
  });
  return Album;
};