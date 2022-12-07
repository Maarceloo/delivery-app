const { salesProducts, Product, Sales } = require('../../database/models');

const postSalesProducts = async (body) => {
  const newSale = await salesProducts.create(body);
  return newSale;
};

const getAllSalesProducts = async () => {
  const data = await salesProducts.findAll({
    include: [
      {
        model: Product,
        as: 'products',
      },
      {
        model: Sales,
        as: 'Sales',
      },
    ],
  });
  return data;
};

module.exports = { postSalesProducts, getAllSalesProducts };
