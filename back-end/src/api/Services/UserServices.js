const md5 = require('md5');
const { User } = require('../../database/models');

const login = async ({ email, password }) => {
    const validatePassword = md5(password);
    const getUser = await User.findOne({ where: { email } });
    if (!getUser) {
        return { status: 404, message: 'User Not Found' };
    }

    if (validatePassword !== getUser.password) {
        return { status: 404, message: 'Password is Not Correct' };
    }

    return { status: null, message: getUser };
};

const postUser = async ({ name, email, password }) => {
    const newPassword = md5(password);
    const getUserByEmail = await User.findOne({ where: { email } });
    const getUserByName = await User.findOne({ where: { name } });
    if (getUserByEmail || getUserByName) {
        return { status: 409, message: 'User Alredy Exist' };
    }
    const createUser = await User.create({ name, email, password: newPassword });
    if (!createUser) {
        return { status: 400, message: 'User Not Created' };
    }
    return { status: null, message: createUser };
};

module.exports = {
    login,
    postUser,
};