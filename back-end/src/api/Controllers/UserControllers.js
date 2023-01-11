const userServices = require('../Services/UserServices');
const { jwtSign } = require('../Utils/Jwt');

const login = async (req, res) => {
  const { body } = req;
  const { status, message } = await userServices.login(body);

  if (status) {
    return res.status(status).json(message);
  }

  const token = await jwtSign(message);

  const { id, name, email, role } = message;
  return res.status(200).json({ id, name, email, role, token });
};

const postUser = async (req, res) => {
  const { body } = req;
  const { status, message } = await userServices.postUser(body);
  if (status) {
    return res.status(status).json(message);
  }
  const token = await jwtSign(message);

  const { id, name, email, role } = message;
  return res.status(201).json({ id, name, email, role, token });
};
const adminPostUser = async (req, res) => {
  const { body } = req;
  const { status, message } = await userServices.adminPostUser(body);
  if (status) {
    return res.status(status).json(message);
  }
  return res.status(201).json(message);
};

const getSellers = async (_req, res) => {
  const { status, message } = await userServices.getSellers();
  if (status) {
    return res.status(status).json(message);
  }
  return res.status(200).json(message);
};

const getUsers = async (_req, res) => {
  const { status, message } = await userServices.getUsers();
  if (status) {
    return res.status(status).json(message);
  }
  return res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const { body } = req;
  const { status, message } = await userServices.deleteUser(body.id);
  if (status) {
    return res.status(status).json(message);
  }
  return res.status(200).json(message);
};

module.exports = {
  login,
  postUser,
  getSellers,
  adminPostUser,
  getUsers,
  deleteUser,
};
