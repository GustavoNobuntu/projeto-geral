const { DataTypes } = require('sequelize');

const defineModel = (sequelize) => {
  return sequelize.define('Tenant', {
    owner:{
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Nome da tabela referenciada
        key: 'id', // Chave primária da tabela referenciada
      },
      allowNull: false,
    },
    dbType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbConfig: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = defineModel;