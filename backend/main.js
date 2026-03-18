// Landing page interactions: magnetic CTA, skin ID preview, retake logic

function initYear() {
  const spans = document.querySelectorAll('#year');
  const year = new Date().getFullYear();
  spans.forEach((s) => (s.textContent = String(year)));
}

function initMagneticCTA() {
  const btn = document.querySelector('[data-magnetic]');
  if (!btn) return;

  const strength = 18;

  function handleMove(event) {
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const tx = (x / rect.width) * strength;
    const ty = (y / rect.height) * strength;
    btn.style.transform = `translate(${tx}px, ${ty}px)`;
  }

  function reset() {
    btn.style.transform = 'translate(0, 0)';
  }

  btn.addEventListener('mousemove', handleMove);
  btn.addEventListener('mouseleave', reset);
  btn.addEventListener('click', () => {
    window.location.href = 'quiz.html';
  });
}

function initLandingPreview() {
  const skinType = localStorage.getItem('skinType');
  const idEl = document.getElementById('landing-skin-id');
  const noteEl = document.getElementById('landing-skin-advice');
  if (!idEl || !noteEl) return;

  if (!skinType) return;

  const adviceMap = {
    Dry: 'Lean into ceramides, glycerin, and oat extracts. Buffer strong actives with moisturiser sandwiches.',
    Oily: 'Lightweight gels, consistent exfoliation with salicylic acid, and non-comedogenic hydration are your north star.',
    Combination:
      'Multi-zone logic: cushiony moisturiser for cheeks, lighter textures for the T‑zone, and flexible actives.',
    Sensitive:
      'Fragrance-free, short INCI lists, and patch-tested actives. Think barrier-first with panthenol and centella.',
    Balanced:
      'You have room to explore gentle actives. Maintain with steady SPF, light hydration, and occasional chemical exfoliation.',
  };

  const label = skinType + ' Skin ID';
  idEl.textContent = label;
  noteEl.textContent = adviceMap[skinType] || adviceMap.Balanced;
}

function initRetake(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMagneticCTA();
  initLandingPreview();
  initRetake('retake-footer-landing');
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