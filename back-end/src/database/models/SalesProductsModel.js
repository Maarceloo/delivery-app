const SalesProductsModelSchema = (sequelize, DataTypes) => {
  const SalesProductsModel = sequelize.define(
    "salesProducts",
    {
      saleId: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: "SalesModel",
          key: "id",
        },
      },
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "ProductsModel",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "sales_products",
      timestamps: false,
      underscored: true,
    }
  );

  SalesProductsModel.associate = (models) => {
    SalesProductsModel.belongsTo(models.Product, {
      as: "products",
      foreignKey: "productId",
    });
    SalesProductsModel.belongsTo(models.Sales, {
      as: "Sales",
      foreignKey: "saleId",
    });
  };

  return SalesProductsModel;
};

module.exports = SalesProductsModelSchema;
