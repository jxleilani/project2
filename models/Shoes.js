module.exports = function(sequelize, DataTypes) {
  const Shoes = sequelize.define("Shoe", {
    shoes_name: DataTypes.STRING,
    shoes_url: DataTypes.STRING
  });
  return Shoes;
};