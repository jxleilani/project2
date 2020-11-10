module.exports = function(sequelize, DataTypes) {
  const Tops = sequelize.define("Tops", {
    tops_name: DataTypes.STRING,
    tops_url: DataTypes.STRING
  });
  return Tops;
};