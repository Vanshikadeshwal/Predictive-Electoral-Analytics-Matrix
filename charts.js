// ═══════════════════════════════════════════
//  charts.js  —  Chart.js initialisation
// ═══════════════════════════════════════════

let barChartInstance     = null;
let lineChartInstance    = null;
let scenarioDonutInstance = null;

const GRID_COLOR = 'rgba(255,255,255,0.07)';
const TICK_COLOR = '#6e7681';

function buildLegend(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(item =>
    `<div class="legend-item">
       <div class="legend-dot" style="background:${item.color};"></div>
       <span>${item.label}</span>
     </div>`
  ).join('');
}

// ── Composite bar chart ──
function initBarChart() {
  const scores = CANDIDATES.map((_, i) => compositeScore(i));
  buildLegend('bar-legend', CANDIDATES.map(c => ({ label: c.shortName, color: c.color })));

  barChartInstance = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: CANDIDATES.map(c => `${c.shortName} (${c.id})`),
      datasets: [{
        label: 'Composite score',
        data: scores,
        backgroundColor: CANDIDATES.map(c => c.color),
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` Score: ${ctx.raw} / 100`,
          },
        },
      },
      scales: {
        x: {
          max: 100,
          grid: { color: GRID_COLOR },
          ticks: { color: TICK_COLOR },
        },
        y: {
          grid: { display: false },
          ticks: { color: '#c9d1d9', font: { weight: '600' } },
        },
      },
    },
  });
}

// ── Sentiment trend line chart ──
function initLineChart() {
  buildLegend('line-legend', CANDIDATES.map(c => ({ label: c.shortName, color: c.color })));

  lineChartInstance = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: SENTIMENT_TREND.labels,
      datasets: [
        {
          label: 'Sharma',
          data: SENTIMENT_TREND.a,
          borderColor: CANDIDATES[0].color,
          backgroundColor: 'rgba(59,130,246,0.07)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Verma',
          data: SENTIMENT_TREND.b,
          borderColor: CANDIDATES[1].color,
          backgroundColor: 'rgba(34,197,94,0.07)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Khan',
          data: SENTIMENT_TREND.c,
          borderColor: CANDIDATES[2].color,
          backgroundColor: 'rgba(251,146,60,0.07)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0, max: 80,
          grid: { color: GRID_COLOR },
          ticks: { color: TICK_COLOR, callback: v => v + '%' },
        },
        x: {
          grid: { display: false },
          ticks: { color: TICK_COLOR },
        },
      },
    },
  });
}

// ── Scenario donut chart ──
function initScenarioDonut(pcts) {
  if (scenarioDonutInstance) {
    scenarioDonutInstance.data.datasets[0].data = pcts;
    scenarioDonutInstance.update();
    return;
  }
  scenarioDonutInstance = new Chart(document.getElementById('scenarioDonut'), {
    type: 'doughnut',
    data: {
      labels: CANDIDATES.map(c => c.shortName),
      datasets: [{
        data: pcts,
        backgroundColor: CANDIDATES.map(c => c.color),
        borderColor: '#0d1117',
        borderWidth: 3,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#8b949e', font: { size: 12 }, padding: 16 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw}%`,
          },
        },
      },
    },
  });
}

function updateScenarioDonut(pcts) {
  if (!scenarioDonutInstance) {
    initScenarioDonut(pcts);
    return;
  }
  scenarioDonutInstance.data.datasets[0].data = pcts;
  scenarioDonutInstance.update('active');
}
