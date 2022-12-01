const ProducstModelSchema = (sequelize, DataTypes) => {
    const ProductsModel = sequelize.define(
      "Product",
      {
        id: {
          primaryKey: true, 
          allowNull: false,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        url_image: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
  
module.exports = ProducstModelSchema;
  