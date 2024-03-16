const quizData = [
  {
    question: 'What is the plural of "child"?',
    options: ['childs', 'childes', 'children', 'childens'],
    answer: 'children',
  },
  {
    question: 'Which word means the opposite of "brave"?',
    options: ['fearless', 'courageous', 'timid', 'bold'],
    answer: 'timid',
  },
  {
    question: 'What does the idiom "hit the nail on the head" mean?',
    options: [
      'To miss the target',
      'To accurately describe or identify something',
      'To avoid a problem',
      'To be confused',
    ],
    answer: 'To accurately describe or identify something',
  },
  {
    question: 'What is the past participle of "eat"?',
    options: ['eated', 'ate', 'eaten', 'eating'],
    answer: 'eaten',
  },
  {
    question: 'Which sentence is grammatically incorrect?',
    options: [
      'She speaks French fluently.',
      'They has been waiting for hours.',
      'We haven\'t seen each other since last year.',
      'He will not come to the party.',
    ],
    answer: 'They has been waiting for hours.',
  },
  {
    question: 'What is the correct spelling?',
    options: ['Accomodate', 'Accommodate', 'Acommodate', 'Accomadate'],
    answer: 'Accommodate',
  },
  {
    question: 'What part of speech is the word "quickly"?',
    options: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answer: 'Adverb',
  },
  {
    question: 'Which sentence uses the correct form of the verb "to be"?',
    options: [
      'She were happy to see him.',
      'We am going to the cinema tonight.',
      'They was waiting for the bus.',
      'He is studying for his exam.',
    ],
    answer: 'He is studying for his exam.',
  },
  {
    question: 'What is the meaning of the word "ubiquitous"?',
    options: ['Rare', 'Widespread', 'Dangerous', 'Delicious'],
    answer: 'Widespread',
  },
  {
    question: 'What is the plural of "mouse" (the animal)?',
    options: ['Mouses', 'Mice', 'Micees', 'Mousees'],
    answer: 'Mice',
  },
];


const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();