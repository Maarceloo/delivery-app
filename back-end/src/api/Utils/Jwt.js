const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const filePath = '../back-end/jwt.evaluation.key';

const SECRET_KEY = () =>
  fs.readFile(filePath, 'utf-8', (_err, data) => JSON.stringify(data));

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const jwtSign = async ({ id, name, email }) =>
  jwt.sign({ id, name, email }, await SECRET_KEY(), jwtConfig);

// const jwtValidate = async (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) return res.status(401).json({ message: 'Token not found' });

//   try {
//     const decoded = jwt.verify(token, secret);
//     req.user = decoded.userId;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Expired or invalid token' });
//   }
// };

// const authenticateToken = async (req, res, next) => {
//     const { id } = req.params;
//     const { user } = req;

//     const post = await postService.getPostId(id);
//     if (!post) return res.status(404).json({ message: 'Post does not exist' });

//     const { userId } = post.dataValues;
//     if (userId !== user) return res.status(401).json({ message: 'Unauthorized user' });

//     next();
// };

module.exports = {
  jwtSign,
};
