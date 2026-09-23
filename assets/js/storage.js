function updateTopBarHighScore() {
  const savedHighScore = parseInt(localStorage.getItem('quizHighScore'), 10) || 0;
  topBarHighScore.textContent = `${savedHighScore}%`;
}

function resetHighScore() {
  if (confirm('Hapus rekor High Score yang tersimpan di browser?')) {
    localStorage.removeItem('quizHighScore');
    updateTopBarHighScore();
    highScoreEl.textContent = '0%';
    alert('High Score berhasil direset.');
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('quizTheme') || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.className = 'theme-icon fa-solid fa-sun';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) themeIcon.className = 'theme-icon fa-solid fa-moon';
  }
}
