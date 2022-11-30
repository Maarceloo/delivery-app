const userServices = require('../Services/UserServices')

const login = async (req, res) => {
    const { body } = req
    const { status, message } = await userServices.login(body)
    if (status) {
        return res.status(status).json(message)
    }
    return res.status(200).json(message)
}

module.exports = {
    login
}