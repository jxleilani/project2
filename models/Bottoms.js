module.exports = function(sequelize, DataTypes) {
  const Bottoms = sequelize.define("Bottoms", {
    bottoms_name: DataTypes.STRING,
    bottoms_url: DataTypes.STRING
  });
  return Bottoms;
};