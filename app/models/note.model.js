'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Note.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'notes',
    modelName: 'Note',
  });

  Note.associate = (models) => {
    Note.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  
  return Note;
};