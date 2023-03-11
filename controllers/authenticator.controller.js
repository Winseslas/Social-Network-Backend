const { user } = require("../database/sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const primaryKey = process.env.primary_key

module.exports.signUp = async (req, res) => {
    const { firstname, pseudo, email, password } = req.body

    bcrypt.hash(password, 10)
        .then((hash) => {
            user.create({
                firstname,
                pseudo,
                email,
                password: hash
            }).then((user) => {
                const message = `Dear ${user.firstname}, your account has been successfully created.`
                res.status(201).json({ create: true, message: message })
            }).catch((error) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ create: false, message: error.message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ create: false, message: error.message, data: error })
                }
                const message = `An error has occurred. Please try again in a few moments.`
                res.status(500).json({ message, create: false, data: error })
            })
        })
}

module.exports.signIn = async (req, res) => {
    user.findOne({ where: { email: req.body.email } }, {attributes: {exclude: ['password']}})
        .then(user => {

            if (!user) {
                const message = `Invalid credential`
                return res.status(404).json({ message })
            }

            bcrypt.compare(req.body.password, user.password)
                .then(isPasswordValid => {

                    if (!isPasswordValid) {
                        const message = `Invalid credential`
                        return res.status(401).json({ message })
                    }

                    // // JWT
                    const token = jwt.sign(
                        { userId: user.id },
                        primaryKey,
                        { expiresIn: '24h' }
                    )

                    const message = `Successfully connected`
                    return res.status(200).json({ message, data: user, token: token })
                })
        })
        .catch((error) => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.json({ message, data: error })
        })
}

module.exports.logout = async (req, res) => {
    if (req.headers.authorization != null) {
        req.headers.authorization = null
        const message = `Logout`
        res.json({ message, data: req.headers.authorization })
    } else {
        const message = `You are not connecting so you cannot log out`
        res.json({ message })
    }
}