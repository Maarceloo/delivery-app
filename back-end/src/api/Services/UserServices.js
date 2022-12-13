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
const adminPostUser = async ({ name, email, password, role }) => {
    const newPassword = md5(password);
    const getUserByEmail = await User.findOne({ where: { email } });
    const getUserByName = await User.findOne({ where: { name } });
    if (getUserByEmail || getUserByName) {
        return { status: 409, message: 'User Alredy Exist' };
    }
    const createUser = await User.create({ name, email, password: newPassword, role });
    if (!createUser) {
        return { status: 400, message: 'User Not Created' };
    }
    return { status: null, message: createUser };
};

const getSellers = async () => {
    const getSeller = await User.findAll({ where: { role: 'seller' } });
    if (!getSeller) {
        return { status: 404, message: 'Sellers Not Found' };
    }
    return { status: null, message: getSeller };
};

const getUsers = async () => {
    const getAllUsers = await User.findAll();
    if (!getAllUsers) {
        return { status: 404, message: 'Users Not Found' };
    }
    return { status: null, message: getAllUsers };
};

const deleteUser = async (id) => {
    const delUser = await User.destroy({ where: { id } });
    if (!delUser) {
        return { status: 404, message: 'Users Not Found' };
    }
    return { status: null, message: delUser };
};

module.exports = {
    login,
    postUser,
    getSellers,
    adminPostUser,
    getUsers,
    deleteUser,
};