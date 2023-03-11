const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }

    Like.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        subjet: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })

    return Like
}