/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producto', {
    cod: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'estado',
        key: 'id'
      }
    },
    agregado: {
      type: DataTypes.DATE,
      allowNull: true
    },
    precio: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    tableName: 'producto'
  });
};
