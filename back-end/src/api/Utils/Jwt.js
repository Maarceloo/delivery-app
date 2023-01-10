const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const filePath = './jwt.evaluation.key';

const SECRET_KEY = async () =>
  fs.readFile(filePath, 'utf-8', (_err, data) => JSON.stringify(data));

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const jwtSign = async ({ id, name, email }) => {
  const token = jwt.sign({ id, name, email }, await SECRET_KEY(), jwtConfig);
  return token;
};

const jwtValidate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(token, await SECRET_KEY());
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  jwtSign,
  jwtValidate,
};
