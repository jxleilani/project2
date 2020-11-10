module.exports = function(sequelize, DataTypes) {
  const Shoes = sequelize.define("Shoe", {
    shoesName: DataTypes.STRING,
    shoesUrl: DataTypes.STRING
  });
  return Shoes;
};
