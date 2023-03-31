const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../authentication/auth');
const { generateToken, revokedToken } = require('../../authentication/jwt');
const { verifyUser } = require('../../authentication/users');

//Login route to generate JWT token
router.post('/login', (req, res) => {
  const {username, password} = req.body;
  const isMatch = verifyUser(username, password)
  if (isMatch){
    const token = generateToken(username);
    res.json({token});
  } else {
    res.status(401).json({error: 'Invalid credentials'})
  }  
});

//Logout and revoke the JWT token
router.post('/logout', verifyToken, (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try{
    revokedToken(token);
    res.status(200).json({message: 'You have successfully logged out'});
  } catch (err){
    console.error(err.message);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
