const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bcrypt = require('bcrypt');
const configuration = require('../authentication/configuration/configuration.json');

const sessionMiddleware = session({
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    genid: function(req){
        return bcrypt.hashSync(Date.now().toString(), 10);
    },
    secret: configuration.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
});

module.exports = sessionMiddleware;
