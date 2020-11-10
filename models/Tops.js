module.exports = function(sequelize, DataTypes) {
  const Tops = sequelize.define("Tops", {
    topsName: DataTypes.STRING,
    topsUrl: DataTypes.STRING
  });
  return Tops;
};
