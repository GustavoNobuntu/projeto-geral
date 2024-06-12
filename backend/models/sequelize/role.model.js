const { DataTypes } = require('sequelize');

const defineModel = (sequelize) => {
  return sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = defineModel;