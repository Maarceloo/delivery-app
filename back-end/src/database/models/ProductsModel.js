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
      urlImage: {
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

  ProductsModel.associate = (models) => {
    ProductsModel.hasMany(models.salesProducts, {
      as: "products",
      foreignKey: "productId",
    });
  };

  return ProductsModel;
};

module.exports = ProducstModelSchema;
