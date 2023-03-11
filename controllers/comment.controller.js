const { comment, user, post } = require("../database/sequelize");

module.exports.new = async (req, res) => {
    comment.create(req.body)
        .then((comment) => {
            user.findByPk(req.body.author, { attributes: { exclude: ['password'] } })
                .then((user) => {
                    if (user === null) {
                        const message = `The account does not exist.`
                        return res.status(404).json(message)
                    }
                    const message = `${user.pseudo} your comment has been successfully created.`
                    return res.status(201).json({ message, data: comment });
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
    // const message = `Read comment`
    // res.send({message})

    comment.findAll({
        include: [
            {
                model: post,
                attributes: ['title', "body"]
            },
            {
                model: user,
                attributes: ['firstname', "pseudo", "avatar"]
            }
        ]
    })
        .then((comment) => {
            const message = "The list of comment"
            res.status(200).json({ message, data: comment })
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        })
}

module.exports.show = async (req, res) => {
    // const message = `Show comment`
    // res.send({ message })

    comment.findByPk(req.params.id, {
        include: [
            {
                model: post,
                attributes: ['title', "body"]
            },
            {
                model: user,
                attributes: ['firstname', "pseudo", "avatar"]
            }
        ]
    })
        .then((comment) => {
            if (comment === null) {
                const message = `This comment does not exist.`
                return res.status(404).json(message)
            }
            const message = `Dear ${comment.User.pseudo} you tell`
            res.status(200).json({ message, data: comment })
        })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).send({ message, data: error });
        })
}

module.exports.update = async (req, res) => {
    // const message = `Update comment`
    // res.send({ message })

    const {id} = req.params
    const { body } = req.body
    comment.update({ body }, {
        where: { id: id }
    })
        .then(_ => {
            return comment.findByPk(id, {
                include: [{
                    model: user,
                    attributes: ['pseudo']
                }]
            })
                .then((comment) => {
                    if (comment === null) {
                        const message = `This comment does not exist.`
                        return res.status(404).json({ message })
                    }
                    const message = `${comment.User.pseudo} your comment has been changed successfully`
                    res.json({ message, data: comment })
                }
                )
        }).catch((error) => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).json({ message, data: error })
        })
}

module.exports.delete = async (req, res) => {
    // const message = `Delete comment`
    // res.send({ message })

    comment.findByPk(req.params.id, {
        include: [{
            model: user,
            attributes: ['pseudo']
        }]
    })
        .then((comment) => {
            if (comment === null) {
                const message = `This comment does not exist.`
                return res.status(404).json({ message })
            }
            const commentdeleted = comment
            return comment.destroy({
                where: { id: comment.id }
            })
                .then(_ => {
                    const message = `${commentdeleted.User.pseudo} your comment has been successfully deleted`
                    res.json({ message })
                })
        })
        .catch((error) => {
            const message = `An error has occurred. Please try again in a few moments.`
            res.status(500).json({ message, data: error })
        })
}

