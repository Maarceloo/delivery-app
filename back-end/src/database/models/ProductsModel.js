const ProducstModelSchema = (sequelize, DataTypes) => {
    const ProductsModel = sequelize.define(
      "products",
      {
        id: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
        name: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
        price: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
        url_image: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
      },
      {
        tableName: "products",
        timestamps: false,
        underscored: true,
      }
    );

    return ProductsModel;
  };
  
  module.exports = ProductsModel;
  