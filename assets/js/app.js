quizSettingsForm.addEventListener('submit', handleStartQuiz);
topicSelect.addEventListener('change', updateAvailableQuestionsInfo);

optionsEl.addEventListener('click', (event) => {
  if (answered) return;

  const btn = event.target.closest('.option-btn');
  if (!btn) return;

  answered = true;
  stopTimer();

  const selectedIndex = parseInt(btn.dataset.index, 10);
  const correctIndex = activeQuizQuestions[currentQuestionIndex].correct;

  optionsEl.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    btn.classList.add('correct');
    score++;
    correctAnswersCount++;
    feedbackBox.className = 'feedback-box correct';
    feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    feedbackText.textContent = 'Jawaban Benar.';
  } else {
    btn.classList.add('wrong');
    wrongAnswersCount++;
    const correctBtn = optionsEl.querySelector(`[data-index="${correctIndex}"]`);
    if (correctBtn) correctBtn.classList.add('correct');
    feedbackBox.className = 'feedback-box wrong';
    feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    feedbackText.textContent = 'Jawaban Salah.';
  }

  feedbackBox.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuizQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', handleRestartQuiz);
backToHomeBtn.addEventListener('click', () => switchScreen('home'));
quitQuizBtn.addEventListener('click', handleQuitQuiz);
resetScoreBtn.addEventListener('click', resetHighScore);

headerBrand.addEventListener('click', () => {
  if (!quizScreen.classList.contains('hidden')) {
    handleQuitQuiz();
  } else {
    switchScreen('home');
  }
});

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('quizTheme', newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateTopBarHighScore();
  populateTopicOptions();
  switchScreen('home');
});
