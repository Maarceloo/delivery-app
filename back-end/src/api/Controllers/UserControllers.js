const userServices = require('../Services/UserServices')

const login = async (req, res) => {
    const { body } = req
    const { status, message } = await userServices.login(body)
    if (status) {
        return res.status(status).json(message)
    }
    return res.status(200).json(message)
}

const postUser = async (req, res) => {
    const { body } = req
    const { status, message } = await userServices.postUser(body)
    if (status) {
        return res.status(status).json(message)
    }
    return res.status(201).json(message)
}

module.exports = {
    login,
    postUser
}