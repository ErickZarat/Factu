/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('factura', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'nit'
      }
    },
    vendedor: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    estado: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'estado',
        key: 'id'
      }
    },
    total: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    tableName: 'factura'
  });
};
