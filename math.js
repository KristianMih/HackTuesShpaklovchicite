const quizData = [
    {
      question: 'What is the area of a triangle with base 12 cm and height 15 cm?',
      options: ['90 sq cm', '108 sq cm', '120 sq cm', '180 sq cm'],
      answer: '90 sq cm',
    },
    {
      question: 'If x + 3 = 2x - 5, what is the value of x?',
      options: ['8', '6', '4', '2'],
      answer: '8',
    },
    {
      question: 'What is the value of √144?',
      options: ['9', '11', '12', '14'],
      answer: '12',
    },
    {
      question: 'Find the volume of a cylinder with radius 6 cm and height 10 cm.',
      options: ['360π cm³', '400π cm³', '450π cm³', '480π cm³'],
      answer: '360π cm³',
    },
    {
      question: 'If 2x - 5 = x + 7, what is the value of x?',
      options: ['-12', '-5', '2', '12'],
      answer: '12',
    },
    {
      question: 'What is the value of 3⁴?',
      options: ['81', '243', '729', '81⁄3'],
      answer: '81',
    },
    {
      question: 'Find the perimeter of a rectangle with length 16 cm and width 10 cm.',
      options: ['52 cm', '56 cm', '60 cm', '64 cm'],
      answer: '52 cm',
    },
    {
      question: 'What is the area of a circle with radius 9 cm? (Take π = 3.14)',
      options: ['254.34 sq cm', '265.26 sq cm', '281.82 sq cm', '302.76 sq cm'],
      answer: '254.34 sq cm',
    },
    {
      question: 'If 5x - 3 = 2x + 7, what is the value of x?',
      options: ['2', '3', '4', '5'],
      answer: '5',
    },
    {
      question: 'What is the value of 2⁵?',
      options: ['32', '64', '128', '256'],
      answer: '32',
    },
    {
      question: 'Find the volume of a cone with radius 8 cm and height 15 cm.',
      options: ['480π cm³', '600π cm³', '720π cm³', '960π cm³'],
      answer: '480π cm³',
    },
    {
      question: 'If 3x - 4 = 2x + 7, what is the value of x?',
      options: ['11', '13', '15', '17'],
      answer: '11',
    },
    {
      question: 'What is the area of a square with side length 14 cm?',
      options: ['168 sq cm', '182 sq cm', '196 sq cm', '210 sq cm'],
      answer: '196 sq cm',
    },
    {
      question: 'Find the perimeter of an equilateral triangle with side length 18 cm.',
      options: ['48 cm', '54 cm', '60 cm', '66 cm'],
      answer: '54 cm',
    },
    {
      question: 'If 2ⁿ = 64, what is the value of n?',
      options: ['3', '4', '5', '6'],
      answer: '6',
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
  

