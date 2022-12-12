const SalesModelSchema = (sequelize, DataTypes) => {
  const SalesModel = sequelize.define(
    "Sales",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      deliveryNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "sales",
      timestamps: false,
      underscored: true,
    }
  );

  SalesModel.associate = (models) => {
    SalesModel.belongsTo(models.User, {
      as: "users",
      foreignKey: "userId",
    });

    SalesModel.belongsTo(models.User, {
      as: "sales",
      foreignKey: "sellerId",
    });
    SalesModel.hasMany(models.salesProducts, {
      as: "Sales",
      foreignKey: "saleId",
    });
  };

  return SalesModel;
};

module.exports = SalesModelSchema;
