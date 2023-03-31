const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../authentication/auth');
const { getResults } = require('../../utils/computeResults');

// retrieve quiz results of a user
router.get('/', verifyToken, (req, res) => {
    const {username} = req.user;
    const quizResults = getResults(username);
    try{
        if(!quizResults || quizResults.length === 0){
            return res.status(404).json({message: 'No quiz Results found'});
        }
        res.json(quizResults);
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;