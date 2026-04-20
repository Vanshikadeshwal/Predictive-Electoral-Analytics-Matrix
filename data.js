// ═══════════════════════════════════════════
//  data.js  —  All static data for the dashboard
// ═══════════════════════════════════════════

const CANDIDATES = [
  {
    id: 'A',
    name: 'Rajesh Sharma',
    shortName: 'Sharma',
    role: 'Incumbent · BJP',
    desc: '2-term MLA, national party presence',
    badgeClass: 'badge-a',
    color: '#3b82f6',
    pow: 44,
    powDelta: '-3 pts vs last poll',
  },
  {
    id: 'B',
    name: 'Priya Verma',
    shortName: 'Verma',
    role: 'Challenger · SP',
    desc: 'Youth leader, regional stronghold',
    badgeClass: 'badge-b',
    color: '#22c55e',
    pow: 37,
    powDelta: '+5 pts vs last poll',
  },
  {
    id: 'C',
    name: 'Imran Khan',
    shortName: 'Khan',
    role: 'Independent',
    desc: 'Hyper-local community leader',
    badgeClass: 'badge-c',
    color: '#fb923c',
    pow: 19,
    powDelta: '-2 pts vs last poll',
  },
];

const FACTORS = [
  {
    name: 'Incumbency effect',
    desc: 'Historical advantage or anti-incumbency risk',
    weight: 0.18,
    scores: [5, 0, 0],
    notes: ['2-term MLA, anti-incumbency risk', 'N/A — challenger', 'N/A — independent'],
  },
  {
    name: 'Party strength',
    desc: 'National or regional party base mobilisation',
    weight: 0.20,
    scores: [8, 7, 2],
    notes: ['Strong national presence', 'Regional powerhouse', 'Weak / local only'],
  },
  {
    name: 'Past work (OSINT)',
    desc: 'Verified development record and legislative activity',
    weight: 0.15,
    scores: [7, 8, 3],
    notes: ['Verified dev. projects', 'High social activism', 'Limited record'],
  },
  {
    name: 'Personal base',
    desc: 'Loyal voter cohort and grassroots influence',
    weight: 0.12,
    scores: [7, 6, 8],
    notes: ['Traditional loyalists', 'Youth / urban appeal', 'Hyper-local community'],
  },
  {
    name: 'Religious / caste base',
    desc: 'Bloc solidarity within constituency demographics',
    weight: 0.17,
    scores: [5, 8, 6],
    notes: ['Split support', 'Solidified bloc', 'Minority niche'],
  },
  {
    name: 'Digital sentiment',
    desc: 'Aggregated OSINT — social media, news, forums',
    weight: 0.10,
    scores: [4, 9, 4],
    notes: ['Neutral / negative', 'Highly positive', 'Low visibility'],
  },
  {
    name: 'Campaign resources',
    desc: 'Financial mobilisation and ground-level organisation',
    weight: 0.08,
    scores: [9, 6, 3],
    notes: ['Well-funded', 'Moderately funded', 'Self-funded'],
  },
];

// Weighted composite (0–100 scale)
function compositeScore(candidateIndex) {
  return Math.round(
    FACTORS.reduce((sum, f) => sum + f.scores[candidateIndex] * f.weight, 0) * 10
  );
}

// OSINT sentiment data (positive / neutral / negative %)
const SENTIMENT = [
  { pos: 31, neu: 38, neg: 31, mentions: '14.2k', platform: 'Twitter/X + News' },
  { pos: 58, neu: 28, neg: 14, mentions: '22.8k', platform: 'Instagram + Forums' },
  { pos: 24, neu: 52, neg: 24, mentions: '6.1k',  platform: 'WhatsApp + Local news' },
];

// 8-point trend (every ~4 days over 30 days)
const SENTIMENT_TREND = {
  labels: ['Day 4', 'Day 8', 'Day 12', 'Day 16', 'Day 20', 'Day 24', 'Day 27', 'Day 30'],
  a: [38, 36, 33, 35, 31, 28, 30, 31],
  b: [42, 45, 50, 54, 56, 58, 57, 58],
  c: [20, 22, 21, 24, 22, 24, 23, 24],
};

// Scenario model defaults
const SCENARIO_DEFAULTS = {
  turnout:  65,
  anti:     45,
  youth:    60,
  minority: 40,
};

/**
 * Calculate scenario vote-share given slider values.
 * Returns array [pctA, pctB, pctC] summing to 100.
 */
function calcScenario({ turnout, anti, youth, minority }) {
  let a = 44 - anti * 0.30 + turnout * 0.05;
  let b = 37 + youth * 0.15 + turnout * 0.05 - anti * 0.05;
  let c = 19 + minority * 0.20 - turnout * 0.03;
  // floor to avoid negatives
  a = Math.max(5, a);
  b = Math.max(5, b);
  c = Math.max(5, c);
  const total = a + b + c;
  const pA = Math.round((a / total) * 100);
  const pB = Math.round((b / total) * 100);
  const pC = 100 - pA - pB;
  return [pA, pB, pC];
}
