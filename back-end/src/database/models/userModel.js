const UserModel = (sequelize, DataTypes) => {
    const UserTable = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
    },
      role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: false,
    })
    return UserTable
  }
  module.exports = UserSchema;

export default UserModel