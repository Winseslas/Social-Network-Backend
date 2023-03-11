const { follow, user } = require("../database/sequelize")
const { Op } = require('sequelize');

module.exports.follow = async (req, res) => {

    const follower = req.params.id
    const followed = req.body.followed

    if (followed == follower)
        return res.status(400).json(`You can't follow you`)

    user.findByPk(followed)
        .then((user) => {
            if (user === null) {
                const message = `The user you want to follow does not exist.`
                return res.status(404).json(message)
            }

            follow.findOne({
                where: { followed: { [Op.or]: [followed, follower] }, follower: { [Op.or]: [follower, followed] } }
            }).then((follow) => {
                if (follow === null) {
                    Follow.create({ follower, followed })
                        .then(_ => {
                            const message = `You follow ${user.firstname}`
                            return res.status(201).json({ message });
                        })
                        .catch(error => {
                            const message = `An error has occurred. Please try again in a few moments.`
                            return res.status(500).send({ message, data: error });
                        })
                } else {
                    if (follow.followed == followed) {
                        const message = `You can no longer track this user because they are already following you.`
                        return res.status(400).json({ message, data: follow })
                    } else {
                        const message = `You can no longer follow this user because you are already following them.`
                        return res.status(400).json({ message, data: follow })
                    }
                }
            })
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            return res.status(500).send({ message, data: error });
        })
}

module.exports.unFollow = async (req, res) => {

    const follower = req.params.id
    const followed = req.body.followed

    if (followed == follower)
        return res.status(400).json(`You cannot unsubscribe from your account.`)

    user.findByPk(followed)
        .then((user) => {
            if (user === null) {
                const message = `The user you want to unfollow does not exist.`
                return res.status(404).json(message)
            }

            follow.findOne({
                where: { followed: { [Op.or]: [followed, follower] }, follower: { [Op.or]: [follower, followed] } }
            }).then((follow) => {

                if (follow === null) {
                    const message = `You cannot unsubscribe from this user because you are not subscribed to it.`
                    return res.status(400).json({ message })
                } else {
                    if (follow.follower == follower) {
                        Follow.destroy({ where: { id: follow.id } })
                            .then(_ => {
                                const message = `You will no longer follow ${user.firstname}`
                                console.log(message)
                                return res.json({ message, data: follow })
                            }).catch(error => {
                                const message = `An error has occurred. Please try again in a few moments.`
                                return res.status(500).send({ message, data: error });
                            })
                    }
                    if (follow.follower != follower) {
                        const message = `You cannot unsubscribe from this user because it is he who follows you. you can block it instead.`
                        return res.status(400).json({ message })
                    }
                }
            })
        }).catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        });
}
