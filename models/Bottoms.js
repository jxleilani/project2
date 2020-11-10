module.exports = function(sequelize, DataTypes) {
  const Bottoms = sequelize.define("Bottoms", {
    bottomsName: DataTypes.STRING,
    bottomsUrl: DataTypes.STRING
  });
  return Bottoms;
};
