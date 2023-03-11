const { user, post } = require("../database/sequelize")

module.exports.new = async (req, res) => {
    post.create(req.body)
        .then(_ => {
            user.findByPk(req.body.author, { attributes: { exclude: ['password'] } })
                .then((user) => {
                    if (user === null) {
                        const message = `The account does not exist.`
                        return res.status(404).json(message)
                    }
                    const message = `${user.pseudo} your post has been successfully created.`
                    return res.status(201).json({ message, data: user });
                })
                .catch((error) => {
                    const message = `An error has occurred. Please try again in a few moments.`
                    return res.status(500).send({ message, data: error });
                })
        })
        .catch((error) => {
            const message = `An error has occurred. Please try again in a few moments.`
            return res.status(500).send({ message, data: error });
        })
}

module.exports.read = async (req, res) => {
    post.findAll({
        include: [{
            model: user,
            attributes: ['firstname', "pseudo", "avatar", "email"]
        }]
    })
        .then((post) => {
            const message = "The list of post"
            res.status(200).json({ message, data: post })
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        })
}

module.exports.show = async (req, res) => {
    post.findByPk(req.params.id, {
        include: [{
            model: user,
            attributes: ['firstname', "pseudo", "avatar", "email"]
        }]
    })
        .then((post) => {
            if (post === null) {
                const message = `The post does not exist.`
                return res.status(404).json(message)
            }
            const message = `has been found`
            return res.status(200).json({ message, data: post });
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        });
}

module.exports.update = async (req, res) => {
    const id = req.params.id
    const { title, body } = req.body
    post.update({ title, body }, {
        where: { id: id }
    })
        .then(_ => {
            return post.findByPk(id, {
                include: [{
                    model: user,
                    attributes: ['pseudo']
                }]
            })
                .then((post) => {
                    if (post === null) {
                        const message = `This post does not exist.`
                        return res.status(404).json({ message })
                    }
                    const message = `${post.User.pseudo} your post has been changed successfully`
                    res.json({ message, data: post })
                }
                )
        }).catch((error) => {
            // if (error instanceof ValidationError) {
            //     return res.status(400).json({ message: error.message, data: error })
            // }
            // if (error instanceof UniqueConstraintError) {
            //     return res.status(400).json({ message: error.message, data: error })
            // }
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).json({ message, data: error })
        })
}

module.exports.delete = async (req, res) => {
    post.findByPk(req.params.id, {
        include: [{
            model: user,
            attributes: ['pseudo']
        }]
    })
        .then((post) => {
            if (post === null) {
                const message = `This post does not exist.`
                return res.status(404).json({ message })
            }
            const postdeleted = post
            return post.destroy({
                where: { id: post.id }
            })
                .then(_ => {
                    const message = `${postdeleted.User.pseudo} your post has been successfully deleted`
                    res.json({ message })
                })
        })
        .catch((error) => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).json({ message, data: error })
        })
}
