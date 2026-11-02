// Fixture : forme d'un modèle Sequelize des api-* (class extends Model + init + associate).
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    static associate(models) {
      this.belongsTo(models.Profil, {
        foreignKey: 'id_user',
        as: 'profil',
      });
    }
  }
  Addresses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    city: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    tableName: 'addresses',
  });
  return Addresses;
};
