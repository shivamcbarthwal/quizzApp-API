const jwt = require('jsonwebtoken');
const config = require('../authentication/configuration/configuration.json');
const { isTokenRevoked } = require('./jwt');
const secretKey = config.secretKey;

// verify jwt token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    if(isTokenRevoked(token)){
      return res.status(401).json({error: 'Unauthorized'});
    }
    try{
      const decoded = jwt.verify(token, secretKey);
      req.user = {userId: decoded.userId, username: decoded.username};
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token'})
    }
  } else{
    res.status(401).json({error: 'No token provided'});
  }
}
module.exports = {verifyToken};