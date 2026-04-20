// ═══════════════════════════════════════════
//  scenario.js  —  Scenario modeler logic
// ═══════════════════════════════════════════

const SLIDER_CONFIG = [
  { id: 'turnout',  label: 'Overall voter turnout',          suffix: '%' },
  { id: 'anti',     label: 'Anti-incumbency sentiment',      suffix: '%' },
  { id: 'youth',    label: 'Youth voter mobilisation (B)',   suffix: '%' },
  { id: 'minority', label: 'Minority bloc consolidation (C)',suffix: '%' },
];

function buildSliders() {
  document.querySelectorAll('.slider-block[data-id]').forEach(block => {
    const id  = block.dataset.id;
    const cfg = SLIDER_CONFIG.find(s => s.id === id);
    const min = block.dataset.min;
    const max = block.dataset.max;
    const val = block.dataset.val;

    block.innerHTML = `
      <div class="slider-label-row">
        <span class="slider-name">${cfg.label}</span>
        <span class="slider-val" id="val-${id}">${val}${cfg.suffix}</span>
      </div>
      <input type="range" id="s-${id}" min="${min}" max="${max}" value="${val}" step="1"
             aria-label="${cfg.label}" />
    `;

    document.getElementById(`s-${id}`).addEventListener('input', onSliderChange);
  });
}

function onSliderChange() {
  const vals = {
    turnout:  +document.getElementById('s-turnout').value,
    anti:     +document.getElementById('s-anti').value,
    youth:    +document.getElementById('s-youth').value,
    minority: +document.getElementById('s-minority').value,
  };

  // Update displayed values
  document.getElementById('val-turnout').textContent  = vals.turnout  + '%';
  document.getElementById('val-anti').textContent     = vals.anti     + '%';
  document.getElementById('val-youth').textContent    = vals.youth    + '%';
  document.getElementById('val-minority').textContent = vals.minority + '%';

  renderScenarioResults(vals);
}

function renderScenarioResults(vals) {
  const [pA, pB, pC] = calcScenario(vals);
  const pcts = [pA, pB, pC];

  // Build sorted bars
  const sorted = CANDIDATES
    .map((c, i) => ({ ...c, pct: pcts[i] }))
    .sort((a, b) => b.pct - a.pct);

  document.getElementById('scenario-bars').innerHTML = sorted.map(c =>
    `<div class="res-bar-row">
       <div class="res-name">${c.shortName}</div>
       <div class="res-bar-bg">
         <div class="res-bar-fill" style="width:${c.pct}%;background:${c.color};"></div>
       </div>
       <div class="res-pct">${c.pct}%</div>
     </div>`
  ).join('');

  // Verdict
  const winner = sorted[0];
  const margin = sorted[0].pct - sorted[1].pct;
  const confidence = margin > 10 ? 'High' : margin > 4 ? 'Moderate' : 'Low';
  const confColor  = margin > 10 ? '#22c55e' : margin > 4 ? '#fb923c' : '#ef4444';

  document.getElementById('verdict-box').innerHTML =
    `Projected winner: <span class="verdict-winner" style="color:${winner.color};">${winner.name}</span>
     &nbsp;·&nbsp; Vote share: <strong>${winner.pct}%</strong>
     &nbsp;·&nbsp; Margin: <strong>${margin}pp</strong>
     &nbsp;·&nbsp; Confidence: <strong style="color:${confColor};">${confidence}</strong>`;

  updateScenarioDonut(pcts);
}

function initScenario() {
  buildSliders();
  renderScenarioResults(SCENARIO_DEFAULTS);
}
