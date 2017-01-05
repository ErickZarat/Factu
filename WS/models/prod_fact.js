/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prod_fact', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    fact: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'factura',
        key: 'id'
      }
    },
    prod: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'cod'
      }
    }
  }, {
    tableName: 'prod_fact'
  });
};
