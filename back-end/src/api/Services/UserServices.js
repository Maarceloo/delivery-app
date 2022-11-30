const { User } = require('../../database/models')
const md5 = require('md5');

const login = async ({ email, password }) => {
    const validatePassword = md5(password)
    const getUser = await User.findOne({ where: { email } })
    if (!getUser) {
        return { status: 404, message: 'User Not Found' }
    }

    if (validatePassword !== getUser.password) {
        return { status: 404, message: 'Password is Not Correct' }
    }

    return { status: null, message: getUser }
}

module.exports = {
    login
}