const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const config = require('../authentication/configuration/configuration.json');
const { readJsonFromFile } = require('../utils/readJsonFromFile');

// secret key for signing JWTs
const secretKey = config.secretKey;

const revokedTokensFilePath = path.join(__dirname, '../db/revokedTokens.json');

let revokedTokens = readJsonFromFile(revokedTokensFilePath) || [];

const saveRevokedTokens = () => {
  const jsonData = JSON.stringify([...revokedTokens]);
  fs.writeFileSync(revokedTokensFilePath, jsonData);
}

// Generate JWT token for user
const generateToken = (username) => {
  const payload = {username};
  const options = { expiresIn: '1d'};
  return jwt.sign(payload, secretKey, options);
}

// Revoke the JWT Token
const revokedToken = (token) => {
  revokedTokens.push(token);
  saveRevokedTokens();
}

// Check if JWT token is removed
const isTokenRevoked = (token) => {
  return revokedTokens.includes(token);
}

module.exports = {
   generateToken,
   revokedToken,
   isTokenRevoked
};