// ═══════════════════════════════════════════
//  matrix.js  —  Factor matrix table builder
// ═══════════════════════════════════════════

function scoreClass(v) {
  if (v >= 7) return 's-high';
  if (v >= 5) return 's-mid';
  return 's-low';
}

function buildMatrix() {
  const tbody = document.getElementById('matrix-body');
  const tfoot = document.getElementById('matrix-foot');
  if (!tbody || !tfoot) return;

  tbody.innerHTML = '';

  FACTORS.forEach(factor => {
    const maxScore = Math.max(...factor.scores);
    const tr = document.createElement('tr');

    let html = `
      <td>
        <div class="factor-name">${factor.name}</div>
        <div class="factor-desc">${factor.desc}</div>
      </td>
      <td class="col-weight">
        <span class="weight-badge">${Math.round(factor.weight * 100)}%</span>
      </td>
    `;

    factor.scores.forEach((score, i) => {
      const isBest = score === maxScore && score > 0;
      html += `
        <td class="score-cell">
          <div class="score-pip ${scoreClass(score)}">${score}</div>
          ${isBest ? '<span class="best-tag">▲ best</span>' : ''}
          <div class="score-note">${factor.notes[i]}</div>
        </td>
      `;
    });

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });

  // Totals row
  const totals = CANDIDATES.map((_, i) => compositeScore(i));
  const maxTotal = Math.max(...totals);
  let footHtml = `<tr>
    <td colspan="2"><span class="total-label">Composite score (weighted)</span></td>`;
  totals.forEach((t, i) => {
    const isWinner = t === maxTotal;
    footHtml += `<td class="score-cell">
      <span class="total-score" style="color:${CANDIDATES[i].color};">${t}</span>
      ${isWinner ? '<div style="font-size:10px;color:#22c55e;margin-top:3px;">▲ highest</div>' : ''}
    </td>`;
  });
  footHtml += '</tr>';
  tfoot.innerHTML = footHtml;
}
