function startTimer() {
  clearInterval(timerInterval);

  if (quizConfig.timeLimit <= 0) {
    timerContainer.classList.add('hidden');
    return;
  }

  timerContainer.classList.remove('hidden');
  timeLeft = quizConfig.timeLimit;
  timerText.textContent = `${timeLeft}s`;
  timerContainer.classList.remove('timer-warning');

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `${timeLeft}s`;

    if (timeLeft <= 5) {
      timerContainer.classList.add('timer-warning');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function handleTimeOut() {
  if (answered) return;
  answered = true;
  wrongAnswersCount++;

  const currentQ = activeQuizQuestions[currentQuestionIndex];
  optionsEl.querySelectorAll('.option-btn').forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === currentQ.correct) {
      btn.classList.add('correct');
    }
  });

  feedbackBox.className = 'feedback-box wrong';
  feedbackIcon.innerHTML = '<i class="fa-solid fa-clock"></i>';
  feedbackText.textContent = 'Waktu pengerjaan habis.';
  feedbackBox.classList.remove('hidden');

  nextBtn.classList.remove('hidden');
}
