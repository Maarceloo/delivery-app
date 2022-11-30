const { User } = require('../../database/models')

const login = async ({ email, password }) => {
    const getUser = await User.findOne({ where: { email, password } })
    if (!getUser) {
        return { status: 404, message: 'User Not Found' }
    }

    return {status: null, message: getUser}
}

module.exports = {
    login
}