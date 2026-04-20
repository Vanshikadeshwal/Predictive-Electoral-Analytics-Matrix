// ═══════════════════════════════════════════
//  main.js  —  App bootstrap & tab routing
// ═══════════════════════════════════════════

// ── Candidate overview cards ──
function buildCandidateCards() {
  const grid = document.getElementById('candidate-cards');
  if (!grid) return;

  grid.innerHTML = CANDIDATES.map((c, i) => {
    const isWinner = c.pow === Math.max(...CANDIDATES.map(x => x.pow));
    return `
      <div class="cand-card ${isWinner ? 'winner' : ''}">
        <div class="cand-badge ${c.badgeClass}">${c.role}</div>
        <div class="cand-name">${c.name}</div>
        <div class="cand-party">${c.desc}</div>
        <div class="pow-label">Probability of win</div>
        <div class="pow-bar-bg">
          <div class="pow-bar" style="width:${c.pow}%;background:${c.color};"></div>
        </div>
        <div class="pow-pct" style="color:${c.color};">${c.pow}%</div>
        <div class="pow-delta">${c.powDelta}</div>
      </div>
    `;
  }).join('');
}

// ── Tab switching ──
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  const btn = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const sec = document.getElementById(`tab-${tabId}`);
  if (btn) btn.classList.add('active');
  if (sec) sec.classList.add('active');
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  buildCandidateCards();
  buildMatrix();
  buildSentimentCards();
  initScenario();
  initBarChart();
  initLineChart();
});
