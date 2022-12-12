module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('sales_products', {
        sale_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            // references: {
            //     model: 'Sales',
            //     key: 'id'
            // },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        product_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER, 
            // references: {
            //     model: 'Product',
            //     key: 'id'
            // },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        quantity: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('sales_products');
    },
  };