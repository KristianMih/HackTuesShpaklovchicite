const quizData = [
    {
      question: 'Кое е правилното изписване на думата "разчупен"?',
      options: ['разчупен', 'раз чупен', 'разчу пен', 'разчу пен'],
      answer: 'разчупен',
    },
    {
      question: 'Какво е синонимът на думата "бърз"?',
      options: ['бавен', 'лек', 'бързомерен', 'ускорен'],
      answer: 'ускорен',
    },
    {
      question: 'Коя от следните думи е съществително?',
      options: ['бързо', 'пътуване', 'летящ', 'играещ'],
      answer: 'пътуване',
    },
    {
      question: 'Какъв вид дума е "помагат"?',
      options: ['съществително', 'прилагателно', 'глагол', 'наречие'],
      answer: 'глагол',
    },
    {
      question: 'Кое е правилното изписване на думата "пролет"?',
      options: ['пролет', 'про лет', 'про лет', 'проле т'],
      answer: 'пролет',
    },
    {
      question: 'Кой от следните изрази е пряко допълнение?',
      options: ['Момчето играе с кучето.', 'Хлапето отиде до магазина.', 'Момчето яде пица.', 'Кучето си лаяе в градината.'],
      answer: 'Момчето яде пица.',
    },
    {
      question: 'Кой от следните знаци се използва в края на изречение?',
      options: ['Запетая (,)', 'Точка (.)', 'Въпросителна точка (?)', 'Тире (-)'],
      answer: 'Точка (.)',
    },
    {
      question: 'Каква е основната идея в стихотворението "Миг" от Иван Вазов?',
      options: ['Животът е кратък и трябва да се наслаждаваме на моментите', 'Хората трябва да бъдат отговорни', 'Любовта е най-важната', 'Семейството е най-важното'],
      answer: 'Животът е кратък и трябва да се наслаждаваме на моментите',
    },
    {
      question: 'Как се казва авторът на "Дядо Йоцо и краката на куката"?',
      options: ['Пенчо Славейков', 'Пейо Яворов', 'Иван Вазов', 'Йордан Йовков'],
      answer: 'Йордан Йовков',
    },
    {
      question: 'Кой от следните творци е писал поезия?',
      options: ['Христо Ботев', 'Иван Вазов', 'Йордан Йовков', 'Елин Пелин'],
      answer: 'Христо Ботев',
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
  