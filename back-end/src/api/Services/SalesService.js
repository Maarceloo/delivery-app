const { Sales } = require('../../database/models');
const { User } = require('../../database/models');

const getIdSale = async (id) => {
  const posts = await Sales.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'users',
        attributes: { exclude: ['password'] },
      },
      {
        model: User,
        as: 'sales',
        attributes: { exclude: ['password'] },
      },
    ],
  });
  return posts;
};

const postSales = async (body) => {
  const date = new Date();

  const obj = {
    ...body,
    saleDate: date,
  };

  const newSale = await Sales.create(obj);

  const { id } = newSale.dataValues;

  return id;
};

const getAllSales = async () => {
  const posts = await Sales.findAll({
    include: [
      {
        model: User,
        as: 'users',
        attributes: { exclude: ['password'] },
      },
      {
        model: User,
        as: 'sales',
        attributes: { exclude: ['password'] },
      },
    ],
  });
  return posts;
};

const salesUpdate = async (id, status) => {
  const sale = await Sales.update({ status }, { where: { id } });
  if (sale) {
    return sale;
  }
  return undefined;
};

module.exports = { getAllSales, postSales, getIdSale, salesUpdate };
