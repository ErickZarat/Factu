/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('caja_chica', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gasto: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    tableName: 'caja_chica'
  });
};
