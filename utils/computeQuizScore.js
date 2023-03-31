const computeQuizScore = (quiz, userAnswers) => {
  let score = 0;
  const questions = quiz.questions;

  for(let i=0; i < questions.length; i++){
    const question = questions[i];
    const userAnswer = userAnswers.find(a => a.questionId === question.questionId);
    if(!userAnswer){
      continue;
    }
    if(question.type === 'mc'){
      const correctAnswer = question.answers.find(a => a.correct);
      if(correctAnswer.choice === userAnswer.choice){
        score++;
      }
    } else if(question.type === 'txt'){
      if(question.answer.text === userAnswer.text){
        score++;
      }
    }
  }

  return score;
}

module.exports = { computeQuizScore };
