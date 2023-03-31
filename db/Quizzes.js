const quizzes = [
  {
    id: 1,
    quizData: {
      title: "US Common Knowledge",
      quizName: "US Quiz",
      quizType: "General Knowledge"
    },
    questions: [
      {
        questionId: 1,
        text: "What is the capital of the United States?",
        type: "mc",
        answers: [
          { choice: "New York City", correct: false },
          { choice: "Philadelphia", correct: false },
          { choice: "Washington D.C.", correct: true },
          { choice: "Chicago", correct: false }
        ]
      },
      {
        questionId: 2,
        text: "What is the largest state in the US?",
        type: "mc",
        answers: [
          { choice: "California", correct: false },
          { choice: "Alaska", correct: true },
          { choice: "Texas", correct: false },
          { choice: "Nevada", correct: false }
        ]
      },
      {
        questionId: 3,
        text: "Where was the first capital of the US?",
        type: "txt",
        answer: {text: "Philadelphia"}
      }
    ]
  },
  {
    id: 2,
    quizData: {
      title: "World Geography",
      quizName: "Geography Quiz",
      quizType: "General Knowledge"
    },
    questions: [
      {
        questionId: 1,
        text: "What is the capital of France?",
        type: "mc",
        answers: [
          { choice: "Berlin", correct: false },
          { choice: "London", correct: false },
          { choice: "Paris", correct: true },
          { choice: "Rome", correct: false }
        ]
      },
      {
        questionId: 2,
        text: "What is the largest country in the world?",
        type: "mc",
        answers: [
          { choice: "Canada", correct: false },
          { choice: "Russia", correct: true },
          { choice: "China", correct: false },
          { choice: "Australia", correct: false }
        ]
      },
      {
        questionId: 3,
        text: "What is the highest mountain in the world?",
        type: "txt",
        answer: {text: "Mount Everest"}
      }
    ]
  }
];

module.exports = quizzes;
