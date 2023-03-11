const { user } = require("../database/sequelize")
const { ValidationError, UniqueConstraintError } = require('sequelize')


module.exports.read = async (req, res) => {
    user.findAll({ attributes: { exclude: ['password'] } })
        .then((users) => {
            const message = "The list of users"
            res.status(200).json({ message, data: users })
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        });
}

module.exports.show = async (req, res) => {
    user.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        .then((user) => {
            if (user === null) {
                const message = `The user does not exist.`
                return res.status(404).json(message)
            }
            const message = `${user.firstname} has been found`
            return res.status(200).json({ message, data: user });
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        });
}

module.exports.update = async (req, res) => {
    const id = req.params.id
    user.update(req.body, {
        where: { id: id }
    })
        .then(_ => {
            return user.findByPk(id, { attributes: { exclude: ['password'] } })
                .then(user => {
                    if (user === null) {
                        const message = `This account does not exist.`
                        return res.status(404).json({ message })
                    }
                    const message = `${user.firstname} your account has been changed successfully`
                    res.json({ message, data: user })
                }
                )
        }).catch((error) => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).json({ message, data: error })
        })
}

module.exports.delete = async (req, res) => {
    user.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        .then(user => {
            if (user === null) {
                const message = `This account does not exist.`
                return res.status(404).json({ message })
            }
            const userdeleted = user
            return user.destroy({
                where: { id: user.id }
            })
                .then(_ => {
                    const message = `${userdeleted.firstname} your account has been successfully deleted`
                    res.json({ message, data: userdeleted })
                })
        })
        .catch((error) => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).json({ message, data: error })
        })
}
