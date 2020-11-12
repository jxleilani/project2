module.exports = function(sequelize, DataTypes) {
  const Shoes = sequelize.define("Shoes", {
    shoesName: DataTypes.STRING,
    shoesUrl: DataTypes.STRING
  });
  return Shoes;
};
