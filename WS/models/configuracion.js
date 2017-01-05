/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configuracion', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    iva: {
      type: "DOUBLE",
      allowNull: true
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reg_prv: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codpostal: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'configuracion'
  });
};
