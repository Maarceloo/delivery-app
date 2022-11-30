const { validateEmail } = require("../Utils/Validate")

const emailValidate = async (req, res, next) => {
    const { body } = req
    if (!body.email) {
        return res.status(400).json({ message: 'Fields Missing' })
    }

    const validate = validateEmail(body.email)
    if (!validate) {
        return res.status(404).json({ message: 'Invalid Email' })
    }
    return next()
}

const passwordValidate = async (req, res, next) => {
    const { body } = req
    if (!body.password) {
        return res.status(400).json({ message: 'Fields Missing' })
    }
    if (body.password.length < 6) {
        return res.status(404).json({ message: 'Invalid Password' })
    }
    return next()
}

module.exports = {
    emailValidate,
    passwordValidate,
}