const service = require('../Services/SalesService');

const postSales = async (req, res) => {
  const idSale = await service.postSales(req.body);
  const newSale = await service.getIdSale(idSale);
  return res.status(201).json(newSale);
};

const getAllSales = async (_req, res) => {
  const data = await service.getAllSales();
  return res.status(200).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const data = await service.getIdSale(id);
  return res.status(200).json(data);
};

module.exports = { postSales, getAllSales, getSaleById };
