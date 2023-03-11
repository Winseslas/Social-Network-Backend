const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }

    Post.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 255,
                notEmpty: { msg: "Title cannot be empty"},
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 500,
                notEmpty: { msg: "message cannot be empty"},
            }
        },
        picture:{
            type: DataTypes.STRING,
        },
        video: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })

    return Post
}