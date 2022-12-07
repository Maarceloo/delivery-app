const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "customer",
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: false,
    }
  );
  UserTable.associate = (models) => {
    UserTable.hasMany(models.Sales, {
      as: "sales",
      foreignKey: 'sellerId',
    });
    UserTable.hasMany(models.Sales, {
      as: "users",
      foreignKey: 'userId',
    });
  };

  return UserTable;
};

module.exports = UserSchema;
