const express = require('express');
const app = express();
const sessionMiddleware = require('./authentication/session');
const { verifyToken } = require('./authentication/auth');

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/api', require('./routes/api/authentication'))
app.use('/api/quizzes', verifyToken, require('./routes/api/quizzes'))
app.use('/api/results', verifyToken, require('./routes/api/results'))
  
// Centralized error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

// Use the session middleware
app.use(sessionMiddleware);

app.listen(3001, () => {
    console.log('Server started on port 3001')
})