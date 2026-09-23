function populateTopicOptions() {
  if (typeof rawQuizData === 'undefined' || !Array.isArray(rawQuizData)) return;

  const categories = [...new Set(rawQuizData.map(item => item.category))];
  topicSelect.innerHTML = '<option value="all">Semua Topik (Campuran)</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    topicSelect.append(option);
  });

  updateAvailableQuestionsInfo();
}

function updateAvailableQuestionsInfo() {
  const selectedTopic = topicSelect.value;
  const count = (selectedTopic === 'all')
    ? rawQuizData.length
    : rawQuizData.filter(item => item.category === selectedTopic).length;

  availableQuestionsInfo.textContent = `Tersedia ${count} soal untuk topik ini di bank soal.`;
}

function handleStartQuiz(event) {
  event.preventDefault();

  const selectedTopic = topicSelect.value;
  const countValue = questionCountSelect.value;
  const timeValue = parseInt(timeLimitSelect.value, 10);
  const shouldShuffleQuestions = shuffleQuestionsCheckbox.checked;
  const shouldShuffleOptions = shuffleOptionsCheckbox.checked;

  let filtered = (selectedTopic === 'all')
    ? [...rawQuizData]
    : rawQuizData.filter(item => item.category === selectedTopic);

  if (filtered.length === 0) {
    alert('Tidak ada soal yang tersedia untuk topik ini.');
    return;
  }

  if (shouldShuffleQuestions) {
    filtered = shuffleArray(filtered);
  }

  let limit = (countValue === 'all') ? filtered.length : parseInt(countValue, 10);
  if (limit > filtered.length) limit = filtered.length;

  activeQuizQuestions = filtered.slice(0, limit).map(q => prepareQuestion(q, shouldShuffleOptions));

  quizConfig = {
    topic: selectedTopic,
    questionCount: limit,
    timeLimit: timeValue,
    shuffleQuestions: shouldShuffleQuestions,
    shuffleOptions: shouldShuffleOptions
  };

  currentQuestionIndex = 0;
  score = 0;
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  answered = false;

  switchScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const currentQ = activeQuizQuestions[currentQuestionIndex];
  const totalQuestions = activeQuizQuestions.length;

  progressBar.style.width = `${(currentQuestionIndex / totalQuestions) * 100}%`;
  progressEl.textContent = `Soal ${currentQuestionIndex + 1}/${totalQuestions}`;
  categoryBadge.textContent = currentQ.category;
  questionEl.textContent = currentQ.question;

  optionsEl.innerHTML = '';
  currentQ.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = optionText;
    btn.dataset.index = index;
    btn.setAttribute('data-key', OPTION_KEYS[index] || (index + 1));
    optionsEl.append(btn);
  });

  feedbackBox.classList.add('hidden');
  feedbackBox.className = 'feedback-box hidden';
  nextBtn.classList.add('hidden');

  startTimer();
}

function showResult() {
  stopTimer();
  progressBar.style.width = '100%';

  const total = activeQuizQuestions.length;
  const percentage = Math.round((score / total) * 100);
  const savedHighScore = parseInt(localStorage.getItem('quizHighScore'), 10) || 0;

  if (percentage > savedHighScore) {
    localStorage.setItem('quizHighScore', percentage);
    highScoreEl.innerHTML = `${percentage}% <span class="badge-record"><i class="fa-solid fa-fire"></i> Rekor Baru!</span>`;
    resultTrophy.innerHTML = '<i class="fa-solid fa-trophy"></i>';
    resultTitle.textContent = 'Rekor Baru Tercapai';
  } else {
    highScoreEl.textContent = `${savedHighScore}%`;
    resultTrophy.innerHTML = percentage >= 80 ? '<i class="fa-solid fa-star"></i>' : percentage >= 50 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-solid fa-book-open"></i>';
    resultTitle.textContent = percentage >= 80 ? 'Hasil Sangat Baik' : percentage >= 50 ? 'Kuis Selesai' : 'Perlu Latihan Lagi';
  }

  scoreEl.textContent = `${score}/${total} (${percentage}%)`;
  correctCountEl.textContent = correctAnswersCount;
  wrongCountEl.textContent = wrongAnswersCount;
  resultMessage.textContent = `Anda menjawab ${score} dari ${total} soal dengan tepat.`;

  updateTopBarHighScore();
  switchScreen('result');
}

function handleRestartQuiz() {
  let filtered = (quizConfig.topic === 'all')
    ? [...rawQuizData]
    : rawQuizData.filter(item => item.category === quizConfig.topic);

  if (quizConfig.shuffleQuestions) {
    filtered = shuffleArray(filtered);
  }

  activeQuizQuestions = filtered.slice(0, quizConfig.questionCount).map(q => prepareQuestion(q, quizConfig.shuffleOptions));

  currentQuestionIndex = 0;
  score = 0;
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  answered = false;

  switchScreen('quiz');
  renderQuestion();
}

function handleQuitQuiz() {
  if (confirm('Keluar dari sesi kuis saat ini dan kembali ke pengaturan?')) {
    stopTimer();
    switchScreen('home');
  }
}
