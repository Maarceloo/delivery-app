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
        foreignKey: true
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
      },
      deliveryAdress: {
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
      foreignKey: "user_id",
      as: "users",
    });
  };

  SalesModel.associate = (models) => {
    SalesModel.belongsTo(models.User, {
      foreignKey: "seller_id",
      as: "users",
    });
  };

  return SalesModel;
};

module.exports = SalesModelSchema;
