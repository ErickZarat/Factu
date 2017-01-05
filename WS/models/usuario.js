/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agregado: {
      type: DataTypes.DATE,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'usuario'
  });
};
