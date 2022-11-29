module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('products', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING(100)
        },
        price: {
            allowNull: false,
            type: Sequelize.DECIMAL(4, 2)
        },
        url_image: {
            allowNull: false,
            type: Sequelize.STRING(200)
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('products');
    },
  };