const { user } = require("../database/sequelize");
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


module.exports.uploadProfil = async (req, res, next) => {

    const { file, body: { name, id } } = req;
    const fileName = name + ".png";

    if (file.size > 500000) return next(new Error("The file must be less than 500KB"));
    if (file.mimetype !== "image/jpg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") return next(new Error("Incompatible format"));

    try {
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__basedir}/client/public/uploads/profil/${fileName}`)
        );

        const updatedUser = await user.update({ avatar: "./uploads/profil/" + fileName }, {
            where: { id: id }
        });
        if (updatedUser[0] === 0) {
            const message = `This account does not exist.`
            return res.status(404).json({ message });
        }

        const foundUser = await user.findByPk(id, { attributes: { exclude: ['password'] } });
        if (foundUser === null) {
            const message = `This account does not exist.`
            return res.status(404).json({ message });
        }

        const message = `${foundUser.firstname}, your profile picture has been changed successfully.`
        res.json({ message, data: foundUser });
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "UniqueConstraintError") {
            const message = error.message;
            return res.status(400).json({ message, data: error });
        }

        const message = `An error has occurred. Please try again in a few moments.`;
        res.status(500).json({ message, data: error });
    }
};
