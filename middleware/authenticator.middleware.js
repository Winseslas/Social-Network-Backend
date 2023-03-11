const jwt = require('jsonwebtoken')
const primaryKey = process.env.primary_key

module.exports.checkUser = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    
    if (!authorizationHeader) {
        const message = `You did not provide an authentication token. Add one to the query header.`
        return res.status(401).json({message, headers: req.headers})
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, primaryKey, (error, decodedToken) => {
        if (error) {
            const message = `You do not have permission to access this resource.`
            return res.status(401).json({message, data: error})
        }
        
        const userId = decodedToken.userId
        if (req.body.UserId && req.body.UserId !== userId) {
            const message = `The identifier is invalid.`
            res.status(401).json({message})            
        } else {
            next()
        }
    })
}