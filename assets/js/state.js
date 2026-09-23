let activeQuizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let answered = false;

let quizConfig = {
  topic: 'all',
  questionCount: 5,
  timeLimit: 15,
  shuffleQuestions: true,
  shuffleOptions: true
};

let timeLeft = 0;
let timerInterval = null;

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E'];
