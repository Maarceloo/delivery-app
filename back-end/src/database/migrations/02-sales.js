module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('sales', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        seller_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        total_price: {
            allowNull: false,
            type: Sequelize.DECIMAL(9, 2)
        },
        delivery_address: {
            allowNull: false,
            type: Sequelize.STRING(100)
        },
        delivery_number: {
            allowNull: false,
            type: Sequelize.STRING(50)
        },
        sale_date: {
            allowNull: false,
            type: Sequelize.DATE
        },
        status: {
            allowNull: false,
            type: Sequelize.STRING(50)
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('sales');
    },
  };