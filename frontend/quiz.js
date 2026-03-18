// Diagnostic quiz logic, animations, progress, and redirect to dashboard
// 🔐 Protect quiz page
const token = localStorage.getItem("ss_token");

if (!token) {
  window.location.href = "login.html";
}
const quizQuestions = [
  {
    id: 'oiliness',
    label: 'Question 1 of 5',
    question: 'By lunchtime, how does your skin usually feel?',
    sub: 'Think about your forehead, nose, and cheeks on a typical workday.',
    options: [
      { value: 'very_oily', text: 'Noticeably shiny, especially on the T‑zone', hint: 'Frequent blotting papers or powder' },
      { value: 'slightly_oily', text: 'A soft glow on the T‑zone only', hint: 'Mostly comfortable, occasionally shiny' },
      { value: 'balanced', text: 'Comfortable, not especially shiny or tight', hint: 'Barely notice it' },
      { value: 'dry', text: 'Feels tight or flaky in some areas', hint: 'Foundation catches on dry patches' },
    ],
  },
  {
    id: 'after-cleanse',
    label: 'Question 2 of 5',
    question: 'Right after cleansing, your skin feels…',
    sub: 'No products on yet. Just water + cleanser.',
    options: [
      { value: 'squeaky', text: 'Squeaky clean and tight', hint: 'You want moisturiser immediately' },
      { value: 'fresh', text: 'Fresh but not uncomfortable', hint: 'No rush to moisturise' },
      { value: 'slippery', text: 'Almost oily again within 30 minutes', hint: 'Shine returns quickly' },
      { value: 'itchy', text: 'A bit itchy, red, or reactive', hint: 'Cleansers sometimes sting' },
    ],
  },
  {
    id: 'texture',
    label: 'Question 3 of 5',
    question: 'Zoom in: what does your overall skin texture look like?',
    sub: 'Imagine being under the harsh bathroom lighting.',
    options: [
      { value: 'visible_pores', text: 'Visible pores and congestion around nose/cheeks', hint: 'Blackheads or clogged pores show up' },
      { value: 'smooth', text: 'Mostly smooth with a few tiny bumps', hint: 'Nothing dramatic' },
      { value: 'flaky', text: 'Flaky patches that catch light', hint: 'Foundation clings in spots' },
      { value: 'reactive', text: 'Red, blotchy, or easily flushed', hint: 'New products often feel risky' },
    ],
  },
  {
    id: 'climate',
    label: 'Question 4 of 5',
    question: 'How would you describe your everyday climate?',
    sub: 'Weather + indoor AC/heating both count.',
    options: [
      { value: 'humid', text: 'Humid and warm most of the time', hint: 'You rarely feel dry' },
      { value: 'dry_cold', text: 'Dry or cold with strong heating', hint: 'Your lips chap easily' },
      { value: 'mixed', text: 'Seasonal shifts between extremes', hint: 'Your routine changes by season' },
      { value: 'temperate', text: 'Mostly mild and temperate', hint: 'Not too dry, not too humid' },
    ],
  },
  {
    id: 'tolerance',
    label: 'Question 5 of 5',
    question: 'When you try new actives (like retinoids or acids)…',
    sub: 'Think retinoids, vitamin C, exfoliating acids, etc.',
    options: [
      { value: 'burns', text: 'They sting, burn, or cause quick redness', hint: 'You often stop using them' },
      { value: 'mild', text: 'A bit tingly, then fine', hint: 'Skin adjusts in a week or two' },
      { value: 'handles', text: 'Handles them well, even with frequent use', hint: 'You like experimenting' },
      { value: 'avoid', text: 'You mostly avoid strong actives', hint: 'Prefer gentle, simple routines' },
    ],
  },
];

const quizState = {
  currentIndex: 0,
  answers: {},
};

function initQuizRetake() {
  const btn = document.getElementById('retake-footer-quiz');
  if (!btn) return;
  btn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });
}

function updateProgressBar() {
  const bar = document.getElementById('quiz-progress-bar');
  if (!bar) return;
  const total = quizQuestions.length;
  const progress = ((quizState.currentIndex) / total) * 100;
  bar.style.width = `${Math.max(4, progress)}%`;
}

function renderQuestion(index, animateFromRight = false) {
  const data = quizQuestions[index];
  const labelEl = document.getElementById('quiz-label');
  const qEl = document.getElementById('quiz-question');
  const subEl = document.getElementById('quiz-subtext');
  const optionsEl = document.getElementById('quiz-options');
  if (!data || !labelEl || !qEl || !subEl || !optionsEl) return;

  const body = document.querySelector('.quiz-body');
  if (body) {
    body.classList.add('quiz-slide');
    body.classList.remove('quiz-slide-out-left', 'quiz-slide-in-right', 'quiz-slide-current');
    if (animateFromRight) {
      body.classList.add('quiz-slide-in-right');
      requestAnimationFrame(() => {
        body.classList.add('quiz-slide-current');
        body.classList.remove('quiz-slide-in-right');
      });
    } else {
      body.classList.add('quiz-slide-current');
    }
  }

  labelEl.textContent = data.label;
  qEl.textContent = data.question;
  subEl.textContent = data.sub;

  optionsEl.innerHTML = '';
  data.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.innerHTML = `<span>${opt.text}</span><span>${opt.hint}</span>`;
    btn.addEventListener('click', () => handleAnswer(data.id, opt.value));
    optionsEl.appendChild(btn);
  });

  updateProgressBar();
}

function handleAnswer(id, value) {
  quizState.answers[id] = value;
  const body = document.querySelector('.quiz-body');
  if (body) {
    body.classList.add('quiz-slide-out-left');
  }

  const isLast = quizState.currentIndex >= quizQuestions.length - 1;

  setTimeout(() => {
    if (isLast) {
      finishQuiz();
    } else {
      quizState.currentIndex += 1;
      renderQuestion(quizState.currentIndex, true);
    }
  }, 260);
}

function deriveSkinType() {
  const a = quizState.answers;

  const oilScore =
    (a.oiliness === 'very_oily' ? 2 :
      a.oiliness === 'slightly_oily' ? 1 :
        a.oiliness === 'dry' ? -2 :
          0);

  const cleanseScore =
    (a['after-cleanse'] === 'squeaky' ? -2 :
      a['after-cleanse'] === 'slippery' ? 2 :
        a['after-cleanse'] === 'itchy' ? -1 : 0);

  const textureScore =
    (a.texture === 'visible_pores' ? 2 :
      a.texture === 'flaky' ? -2 :
        a.texture === 'reactive' ? -1 :
          0);

  const toleranceScore =
    (a.tolerance === 'burns' ? -2 :
      a.tolerance === 'handles' ? 2 : 0);

  const total = oilScore + cleanseScore + textureScore + toleranceScore;

  if (a.tolerance === 'burns' || a.texture === 'reactive') {
    return 'Sensitive';
  }

  if (total >= 3) return 'Oily';
  if (total <= -3) return 'Dry';

  if (a.oiliness === 'balanced' && a['after-cleanse'] === 'fresh') {
    return 'Balanced';
  }

  return 'Combination';
}

function finishQuiz() {
  const loading = document.getElementById('quiz-loading');
  if (loading) {
    loading.classList.add('visible');
  }

  const skinType = deriveSkinType();
  localStorage.setItem('skinType', skinType);
  localStorage.setItem('skinAnswers', JSON.stringify(quizState.answers));

  // Sync skin type to backend if the user is logged in
  const token = localStorage.getItem('ss_token');
  if (token) {
    fetch(''/api/profile/skin-type, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ skin_type: skinType }),
    }).catch(() => {
      // Non-fatal: local storage already has the value
      console.warn('Could not sync skin type to server — will retry on next login.');
    });
  }

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  const yearSpans = document.querySelectorAll('#year');
  const year = new Date().getFullYear();
  yearSpans.forEach((s) => (s.textContent = String(year)));

  initQuizRetake();
  renderQuestion(quizState.currentIndex);
});

// --- Navigation Lock Logic ---
function checkDashboardAccess() {
  const dashboardLink = document.getElementById('nav-dashboard');
  if (!dashboardLink) return;

  const hasSkinType = localStorage.getItem('skinType');

  // If they haven't taken the quiz (no skinType), disable the link
  if (!hasSkinType) {
    dashboardLink.classList.add('disabled');
    dashboardLink.href = 'javascript:void(0)'; // Removes the destination
    dashboardLink.title = 'Please complete the diagnostic quiz first';
  } else {
    dashboardLink.classList.remove('disabled');
    dashboardLink.href = 'dashboard.html';
    dashboardLink.title = '';
  }
}

document.addEventListener('DOMContentLoaded', checkDashboardAccess);