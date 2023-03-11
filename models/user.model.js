const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "First name is a required property" },
                notEmpty: { msg: "First name cannot be empty" }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "Password is a required property" },
                notEmpty: { msg: "Password cannot be empty" }

            }
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: { msg: "An account has already been created with this number" },
        },
        pseudo: {
            type: DataTypes.STRING,
            unique: { msg: "This nickname is not already taken, please choose another" },
            allowNull: false,
            validate: {
                notNull: { msg: "Nickname is a required property" },
                notEmpty: { msg: "Nickname cannot be null" }
            }
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: "This email address already has an account" },
            validate: {
                isEmail: { msg: "Your email address must be valid" },
                notNull: { msg: "Email address is a required property" },
                notEmpty: { msg: "You are a pirate" }
            }
        },
        is_email_verified: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: "./uploads/profil/random-user.png"
        },
        bio: {
            type: DataTypes.STRING,
            max: 1024
        },
        dateofbirthday: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        indexes: [{
            fields: ['email'],
            fields: ['pseudo'],
            fields: ['phonenumber'],
            unique: true,
        }],
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })

    return User
}