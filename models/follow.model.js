const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Follow extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }

    Follow.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        follower: {
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        followed: {
            type: DataTypes.INTEGER,
            allowNull: false
        }       
    }, {
        sequelize,
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })

    return Follow
}