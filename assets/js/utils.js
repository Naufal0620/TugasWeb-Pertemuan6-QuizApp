function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function prepareQuestion(q, shouldShuffleOptions) {
  if (!shouldShuffleOptions) {
    return { ...q, options: [...q.options] };
  }
  const correctText = q.options[q.correct];
  const shuffledOptions = shuffleArray(q.options);
  return {
    ...q,
    options: shuffledOptions,
    correct: shuffledOptions.indexOf(correctText)
  };
}

function switchScreen(screenName) {
  homeScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');

  if (screenName === 'home') {
    homeScreen.classList.remove('hidden');
    progressBarContainer.classList.add('hidden');
  } else if (screenName === 'quiz') {
    quizScreen.classList.remove('hidden');
    progressBarContainer.classList.remove('hidden');
  } else if (screenName === 'result') {
    resultScreen.classList.remove('hidden');
    progressBarContainer.classList.add('hidden');
  }
}
