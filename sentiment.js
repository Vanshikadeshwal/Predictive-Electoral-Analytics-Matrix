// ═══════════════════════════════════════════
//  sentiment.js  —  OSINT sentiment cards
// ═══════════════════════════════════════════

function buildSentimentCards() {
  const container = document.getElementById('sent-cards');
  if (!container) return;

  container.innerHTML = CANDIDATES.map((cand, i) => {
    const s = SENTIMENT[i];
    return `
      <div class="sent-card">
        <div class="sent-name" style="color:${cand.color};">${cand.name}</div>

        <div class="sent-row">
          <div class="sent-lbl">Positive</div>
          <div class="sent-bar-bg">
            <div class="sent-bar-fill" style="width:${s.pos}%;background:#22c55e;"></div>
          </div>
          <div class="sent-pct">${s.pos}%</div>
        </div>

        <div class="sent-row">
          <div class="sent-lbl">Neutral</div>
          <div class="sent-bar-bg">
            <div class="sent-bar-fill" style="width:${s.neu}%;background:#6e7681;"></div>
          </div>
          <div class="sent-pct">${s.neu}%</div>
        </div>

        <div class="sent-row">
          <div class="sent-lbl">Negative</div>
          <div class="sent-bar-bg">
            <div class="sent-bar-fill" style="width:${s.neg}%;background:#ef4444;"></div>
          </div>
          <div class="sent-pct">${s.neg}%</div>
        </div>

        <div class="sent-total">
          ${s.mentions} mentions &nbsp;·&nbsp; ${s.platform}
        </div>
      </div>
    `;
  }).join('');
}
