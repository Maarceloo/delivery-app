const productService = require('../Services/ProductsServices');

const getAllProducts = async (_req, res) => {
  const data = await productService.getAllProducts();
  return res.status(200).json(data);
};

const getIdProduct = async (req, res) => {
  const { id } = req.params;
  const data = await productService.getIdProduct(id);

  if (!data) return res.status(404).json({ message: 'products not found' });

  return res.status(200).json(data);
};

module.exports = { getAllProducts, getIdProduct };
