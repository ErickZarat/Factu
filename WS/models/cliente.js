/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    agregado: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'cliente'
  });
};
