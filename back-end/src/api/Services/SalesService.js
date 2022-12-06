const { Sales } = require('../../database/models');
const { User } = require('../../database/models');

const postSales = async (body) => {
  const obj = {
    ...body,
    saleDate: new Date(),
  };

  const newSale = await Sales.create(obj);
  
  const { id } = newSale.dataValues;
  console.log(id);
    
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
    ],
  });

  return posts;
};

module.exports = { getAllSales, postSales };
