const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_pass, {
	host: process.env.db_host,
	dialect: "mysql",
	logging: false
})

sequelize.authenticate()
	.then(_ => console.log("Connected to MySQL database !"))
	.catch(error => console.error(`An error has occurred ${error}`))

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

// Models
db.user = require("../models/user.model")(sequelize, Sequelize)
db.follow = require("../models/follow.model")(sequelize, Sequelize)
db.post = require("../models/post.model")(sequelize, Sequelize)
db.comment = require("../models/comment.model")(sequelize, Sequelize)
db.like = require("../models/like.model")(sequelize, Sequelize)

// Associations
db.follow.belongsTo(db.user, {foreignKey: 'follower' });
db.follow.belongsTo(db.user, {foreignKey: 'followed' });
db.post.belongsTo(db.user, {foreignKey: 'author' });
db.comment.belongsTo(db.user, {foreignKey: 'author' });
db.comment.belongsTo(db.post, {foreignKey: 'subjet' });
db.like.belongsTo(db.user, {foreignKey: 'author' });
db.like.belongsTo(db.post, {foreignKey: 'subjet' });



// db.sequelize.sync({ })
// 	.then(_ => {
// 		console.log("The " + process.env.db_name + " database has been synchronized successfully.")
// 	})
module.exports = db
