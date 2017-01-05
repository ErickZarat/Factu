/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estado', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cat: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'estado'
  });
};
