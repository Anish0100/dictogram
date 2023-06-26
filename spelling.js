const startBtn = document.getElementById('start-btn');
const infoBox = document.getElementById('info-box');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizBox = document.getElementById('quiz-box');
const audio = document.getElementById('audio');
const nextBtn = document.getElementById('next-btn');
const answerBox = document.getElementById('answer-input'); answerBox.setAttribute('spellcheck', 'false');
const timer = document.getElementById('timer');
const resultBox = document.getElementById('result-box');
const scoreDisplay = document.getElementById('score'); // renamed
const replayBtn = document.getElementById('replay-btn');
const quitBtn = document.getElementById('quit-btn');
const answer = document.getElementById('displayAnswer');
const exitBtn = document.getElementById('exit');
const spellCheck = document.getElementById('spell-check');
const suggestionBox = document.getElementById('suggestion-box');
const icon = document.getElementById('icon');

let words = [];
let currentQuestion = 0;
let scoreCounter = 0;
let countdownTimer;
let misspelledWordsArray = [];


var canvas2Settings = {
  "target":"canvas",
  "max":"180",
  "animate":true,
  "props":["circle","square","triangle","line"],
  "colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
  "clock":"25"
};
var canvas = new ConfettiGenerator(canvas2Settings);
canvas.render();


// Hide the info-box and quiz-box initially
infoBox.style.display = 'none';
quizBox.style.display = 'none';


// When start button is clicked, show info box
startBtn.addEventListener('click', () => {
  infoBox.style.display = 'block';
  startBtn.style.display = 'none';
});


// When start quiz button is clicked, hide info box and show quiz box
startQuizBtn.addEventListener('click', () => {
  infoBox.style.display = 'none';
  quizBox.style.display = 'block';
  startQuiz();
});

// Function to start the quiz
async function startQuiz() {
  await fetch('spelling.json')
    .then(response => response.json())
    .then(data => {
      // Shuffle the array of words
      words = shuffleArray(data.words);

      // Limit the number of words to 10
      words = words.slice(0, 10);

      // Show the first question
      showQuestion();

      // Start the countdown timer
      countdownTimer = setInterval(updateTimer, 1000);
    });
}

// Function to shuffle an array
function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let userInput='';


function updateSuggestionBox(correctAnswer, userInput) {
  // Create a new suggestion for the current answer and input
  var newSuggestion = `
    <div class="suggestion">Answer: ${correctAnswer}</div>
    <div class="suggestion">Your Input: ${userInput}</div>
  `;

  // Append the new suggestion to the existing suggestions
  suggestionBox.insertAdjacentHTML('beforeend', newSuggestion);
  suggestionBox.scrollTop = suggestionBox.scrollHeight;
}

function showQuestion() {
  audio.pause();
  audio.currentTime = 0;
  const audioSource = words[currentQuestion].audioSource;
  audio.setAttribute('src', audioSource);
  const correctAnswer = words[currentQuestion].answer;
  audio.play().then(() => {
    clearInterval(countdownTimer);
    timer.textContent = '15';
    countdownTimer = setInterval(updateTimer, 1000);
    answer.textContent = words[currentQuestion].meaning;
  });
  answerBox.value = '';
  answerBox.disabled = false;
  answerBox.focus();
  nextBtn.style.display = 'none';
  answerBox.setAttribute('autocomplete', 'off');
  
  updateSuggestionBox(correctAnswer);
  answerBox.addEventListener('input', handleInput);
}

function handleNextBtnClick() {
  const userInput = answerBox.value.trim().toLowerCase();
  if (userInput.length === 0) {
    // Display an error message to the user
    return;
  }
  const correctAnswer = words[currentQuestion].answer.toLowerCase();
  const isCorrect = userInput === correctAnswer;
  if (isCorrect) {
    currentQuestion++;
    if (currentQuestion < words.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  } else {
    updateSuggestionBox(words[currentQuestion].answer, userInput);
  }
  }
  // Initialize an array to store all user inputs for each question
const userInputs = new Array(words.length).fill('');

function handleInput() {
  // Get the current user input and update the userInputs array
  const userInput = answerBox.value.trim().toLowerCase();
  userInputs[currentQuestion] = userInput;
  
  // Clear previous suggestions
  suggestionBox.innerHTML = '';
  
  // Generate suggestions for all questions based on the userInputs array
  for (let i = 0; i < words.length; i++) {
    updateSuggestionBox(words[i].answer, userInputs[i]);
  }
}

nextBtn.addEventListener('click', handleNextBtnClick);
// Function to update the timer
    function updateTimer() {
      let currentTime = parseInt(timer.innerHTML);
    
      if (currentTime > 0) {
        currentTime--;
        timer.innerHTML = currentTime;
      } else {
        clearInterval(countdownTimer);
        answer.textContent = words[currentQuestion].word;
        answerBox.disabled = true;
        nextBtn.style.display = 'block';
        setTimeout(() => {
          if (currentQuestion === words.length - 1) {
            showResult();
          } else {
            currentQuestion++;
            showQuestion();
          }
        }, 1000);
      }
    
      // Show result when countdown timer reaches zero
      if (currentQuestion === words.length - 1 && currentTime === 0) {
        showResult();
      }
    }
  
function replaybtn() {
  document.getElementById("spelling.html").reset(); // Reset form
  document.getElementById("result").innerHTML = ""; // Clear result message
  window.location.href = "spelling.html"; // Redirect to home page
}
  // When the next button is clicked, show the next question
  nextBtn.addEventListener('click', () => {
  // If it is the last question, show the result box
  if (currentQuestion === words.length - 1) {
  showResult();
  } else {
  // Otherwise, move to the next question
  currentQuestion++;
  showQuestion();
  }
  });
  
  function checkAnswer() {
    let userAnswer = answerBox.value.trim().toLowerCase();
    let correctAnswer = words[currentQuestion].answer.toLowerCase();
    
    // Add the user's input to the suggestionBox
    suggestionBox.innerHTML += `<div>${userAnswer}</div>`;
    
    // Check if the user's answer is correct
    if (userAnswer === correctAnswer) {
      scoreCounter++;
    }
    
    // Disable the answer box and show the next button
    answerBox.disabled = true;
    nextBtn.style.display = 'block';
    
    // Stop the timer and show the correct answer
    clearInterval(countdownTimer);
    answer.textContent = words[currentQuestion].word;
    
    // Increment the current question counter
    currentQuestion++;
  }
  

  // Function to show the result
function showResult() {
  function showResults() {
    audio.pause();
    audio.currentTime = 0;

    // Calculate the score
    let score = scoreCounter / words.length * 200;
    
    // Hide the quiz box
    
    quizBox.style.display = 'none';
    // Show the score in the result box
    scoreDisplay.innerHTML = score;
  
    // Show the result box
    resultBox.style.display = 'block';
    
    // Stop the audio playback
    audio.pause();
    audio.currentTime = 0;
    // Stop the countdown timer
    clearInterval(countdownTimer);

     // Hide the answer box
     answerBox.style.display = 'none';

      // Disable the next button
     nextBtn.disabled = true;
  
    // Determine which image to display based on the score
    if (score >= 950 && score <= 1000) {
      document.getElementById('first').style.display = 'block';
    } else if (score >= 850 && score <= 900) {
      document.getElementById('second').style.display = 'block';
    } else if (score >= 750 && score <= 800) {
      document.getElementById('third').style.display = 'block';
    } else {
      document.getElementById('loser').style.display = 'block';
    }
  }
  
  // Call the showResults function
  showResults();
}

spellCheck.addEventListener('click', () => {
  suggestionBox.style.visibility = 'visible';
});
  
  // When quit button is clicked, go back to the home page
  quitBtn.addEventListener('click', () => {
  window.location.href = 'spelling.html';
  });
  

  exitBtn.addEventListener('click', () => {
    window.location.href = 'spelling.html';
    });

  replayBtn.addEventListener('click', () => {
    window.location.href = 'spelling.html';
    });
  

    // When the answer is submitted, check if it is correct and show the correct answer if necessary
  answerBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      // Check if the answer is correct
      if (answerBox.value.toLowerCase() === words[currentQuestion].answer.toLowerCase()) {
        // The answer is correct
        scoreCounter += 5;
      } else {
        // The answer is incorrect
      }
      
      // Move to the next question
      if (currentQuestion === words.length - 1) {
        // If it is the last question, show the result box
        showResult();
      } else {
        // Otherwise, move to the next question
        currentQuestion++;
        showQuestion();
      }
      
      // Clear the answer box
      answerBox.value = '';
    }
  });
 
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    infoBox.style.display = 'none';
    startBtn.style.display = 'block';
  }
});


// When start quiz button is clicked, hide info box and show quiz box with fade-in and fade-out transition
startQuizBtn.addEventListener('click', () => {
  infoBox.classList.add('fade-out');
  quizBox.classList.add('fade-in');
  infoBox.addEventListener('transitionend', () => {
    infoBox.style.display = 'none';
    quizBox.style.display = 'block';
    infoBox.classList.remove('fade-out');
    quizBox.classList.remove('fade-in');
    startQuiz();
  }, { once: true });
});
document.addEventListener("DOMContentLoaded", () => {
  // const answerBox = document.getElementById('answer-input');
  const suggestionBox = document.getElementById('suggestion-box');

  suggestionBox.style.display = 'none';

  // Load the JSON file
  fetch('spelling.json')
    .then(response => response.json())
    .then(words => {
      // Get a random word from the JSON file
      const randomWord = words[Math.floor(Math.random() * words.length)];

      // Display the random word in the suggestion box
      const suggestionElement = document.createElement('div');
      suggestionElement.textContent = randomWord;
      suggestionElement.classList.add('suggestion');
      suggestionBox.appendChild(suggestionElement);
    })
    .catch(error => console.error(error));

  // When the audio loads, display the suggestion box
  const audio = document.getElementById('audio');
  audio.addEventListener('loadeddata', () => {
    suggestionBox.style.display = 'block';
  });
});

spellCheck.addEventListener('click', () => {
  icon.style.display = 'block';
});

function toggleSuggestionBox() {
  suggestionBox.classList.toggle('active');
  icon.style.display = 'block';
}

function closeSuggestionBox() {
  suggestionBox.classList.remove('active');
  suggestionBox.style.visibility = 'hidden';
  icon.style.display = 'none';
}

spellCheck.addEventListener('click', toggleSuggestionBox);

icon.addEventListener('click', closeSuggestionBox);