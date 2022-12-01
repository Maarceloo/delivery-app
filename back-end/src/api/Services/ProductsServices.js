const { Product } = require('../../database/models');

const getAllProducts = async () => {
  const data = await Product.findAll();
  return data;
};

const getIdProduct = async (id) => {
  const data = await Product.findByPk(id);
  return data;
};

module.exports = { getAllProducts, getIdProduct };
