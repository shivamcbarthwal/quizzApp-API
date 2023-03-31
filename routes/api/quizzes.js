const express = require('express');
const { verifyToken } = require('../../authentication/auth');
const router = express.Router();
let quizzes = require('../../db/Quizzes');
const sessionMiddleware = require('../../authentication/session');
const { saveResult } = require('../../utils/computeResults');
const { computeQuizScore } = require('../../utils/computeQuizScore');

router.get('/', verifyToken, (req, res) => {
    try{
        const quizList = Object.values(quizzes).map(({quizData, id}) => ({quizName: quizData.quizName, id}));
        res.json(quizList);
    } catch(err){
        next(err);
    }    
});

// retrieves the quizz data using the id
router.get('/:quizId', verifyToken, (req, res) => {
    const quiz = quizzes.find(quiz => quiz.id === parseInt(req.params.quizId));
    if(!quiz){
        let error = new error('Quiz not found');
        error.status = 404;
        return next(error);
    }
    res.json(quiz); 
})

// retrieves the questions for a specific quiz.
router.get('/:quizId/questions', verifyToken, sessionMiddleware, (req, res) => {
    const quiz = quizzes.find(quiz => quiz.id === parseInt(req.params.quizId))
        if(!quiz){
        return res.status(404).send('Quiz not found')
    }

    // Reset the user's score for the new quiz
    req.session.score = 0;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const questions = quiz.questions.slice(startIndex, endIndex);
    res.json(questions);
})

// compute the user's score
router.post('/:quizId/score', verifyToken, sessionMiddleware, (req, res, next) => {
    const quizId = parseInt(req.params.quizId);
    const userAnswers = req.body.answers;
    console.debug(userAnswers)
    const quiz = quizzes.find(q => q.id === quizId);
    if(!quiz){
        res.status(404).json({error: 'Quiz not found'});
        return;
    }

    // Retrieve the user's session.
    const session = req.session;
    session.score = computeQuizScore(quiz, userAnswers);
    
    // save result for a user
    const result = {quizId, quizName: quiz.quizData.quizName, score: session.score};
    const {username} = req.user;
    saveResult(result, username);
    
    res.json({score: session.score});
});

module.exports = router;