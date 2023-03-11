const { like } = require("../database/sequelize");

// like
module.exports.like = async (req, res) => {
    const { id } = req.params
    const { subjet } = req.body
    // console.log(req.body)

    // return res.send({ data: subjet, id })

    like.findOne(
        {
            where: { author: id, subjet: subjet }
        }
    ).then((like) => {
        if (like === null) {
            const message = `Like`
            return res.send({ message })
        }
        const message = `Like`
        return res.send({ message, data: like })
    })
        .catch(error => {
            const message = `An error has occurred. Please try again in a few moments.`
            return res.status(500).send({ message, data: error });
        })

}

module.exports.unlike = async (req, res) => {
    const message = `Unlike`
    res.send({ message })
}