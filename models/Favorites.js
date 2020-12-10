module.exports = function(sequelize, DataTypes) {
  const Favorites = sequelize.define("Favorites", {
    favTops: DataTypes.STRING,
    favBottoms: DataTypes.STRING,
    favShoes: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
  return Favorites;
};
