const { DataTypes } = require('sequelize');

const defineModel = (sequelize) => {
  return sequelize.define('User', {
    UID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    TenantUID: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    isAdministrator: {
      type: DataTypes.BOOLEAN,
    },
    memberType: {
      type: DataTypes.STRING,
    },
    Roles: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assumindo que você armazene IDs de roles
      references: {
        model: 'role', // Nome da tabela roles
        key: 'id',
      },
    },
    tenants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assumindo que você armazene IDs de tenants
      references: {
        model: 'tenant', // Nome da tabela tenant
        key: 'id',
      },
    },
  }, {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  });
}
module.exports = defineModel;
