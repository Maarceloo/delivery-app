const service = require('../Services/SalesService');

const postSales = async (req, res) => {
  const data = await service.postSales(req.body);
  return res.status(200).json(data);
};

module.exports = { postSales };