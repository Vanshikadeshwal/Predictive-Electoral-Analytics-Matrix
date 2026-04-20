# TrafficIQ — Hybrid Predictive Traffic Intelligence System

> **Problem Statement 4** — Multi-Source Fusion for Predictive Traffic Congestion Modeling

A fully interactive, browser-based **Hybrid Traffic Intelligence Dashboard** that fuses simulated CCTV computer vision output, GPS/Maps API data, and an LSTM-based congestion prediction model into a unified GIS interface.

---

## 🔴 Live Demo

Open `index.html` directly in any modern browser — **zero dependencies, zero build step, zero server required.**

---

## Features

### 🗺️ GIS Map (Center Panel)
| Feature | Description |
|---|---|
| **Live road network** | 8 Delhi/NCR road segments color-coded by real-time congestion |
| **Congestion heatmap** | Toggle 🔥 button to overlay radial heat gradient by jam severity |
| **Moving vehicles** | 60+ animated vehicles on all roads, speed tied to congestion level |
| **CCTV camera pins** | 6 camera markers — pulse red when detecting high density |
| **Predicted jam markers** | Pulsing red circles + dashed blue overlay for LSTM-flagged roads |
| **Hover tooltips** | Mouse over any road or junction for live speed/congestion/flow data |
| **Junction labels** | 8 major Delhi junctions (Rajiv Chowk, AIIMS, ITO, etc.) |

### 📷 Computer Vision — CCTV Feeds
| Feature | Description |
|---|---|
| **6 live feeds** | Simulated YOLO-style bounding box detection on each camera |
| **Vehicle count** | Per-camera vehicle detection count, updated every 200ms |
| **Density bar** | Green→Amber→Red density indicator per feed |
| **Alert state** | Feed border turns red when nearby road congestion > 70% |
| **Scan line effect** | CRT-style scanline animation for tactical realism |
| **Timestamp overlay** | Live timestamp per feed |

### 🧠 LSTM Prediction Engine
| Feature | Description |
|---|---|
| **60-minute forecast chart** | 4-line chart: Actual + +15min / +30min / +45min predictions |
| **Top-5 jam predictions** | Ranked list of roads most likely to hit standstill |
| **Probability scores** | Color-coded: >75% = critical red, >50% = orange, <50% = green |
| **Model accuracy tracker** | Simulated training accuracy that grows with epochs |

### 📊 Metrics & Analytics
- Average network speed (km/h)
- Congested segment count
- Total vehicles detected via CV
- Average flow rate (veh/min)

### 🕹️ Simulation Controls
| Control | Effect |
|---|---|
| **Congestion slider** | Set baseline congestion % across all roads |
| **Vehicle Volume** | Control how many vehicles CCTV detects |
| **Sim Speed** | 1x–5x tick multiplier |
| **ACCIDENT** | Spike one random road to 90%+ congestion |
| **RUSH HOUR** | Set all corridors to 80% congestion + 420 vehicles |
| **CLEAR ALL** | Reset to free-flow conditions |
| **RANDOMIZE** | Random congestion state for demo |

---

## Problem Statement Coverage

### 1. Computer Vision Extraction (CCTV)
Simulates YOLO v8 output with:
- Bounding boxes per detected vehicle
- Real-time vehicle density calculation
- Anomaly detection (high density → alert state)

### 2. Geospatial Data Ingestion (GPS/Maps)
- 8 road segments modeled on real Delhi/NCR corridors
- Speed, flow rate, and congestion tracked per segment
- Simulates Google Maps Routes API `traffic_model: BEST_GUESS` latency behavior

### 3. Cross-Modal Correlation (Fusion Layer)
- CCTV vehicle density cross-validates GPS congestion level
- False positive detection: mismatches between camera count and road speed trigger alerts
- Fusion status panel shows GPS, CCTV, and LSTM health

### 4. Temporal Forecasting (LSTM / RNN)
- 3-series prediction: +15min, +30min, +45min
- Standstill probability scored per road
- Epoch counter with accuracy growth simulation

---

## Architecture

```
TrafficIQ
├── index.html              ← Complete single-file application
│
├── Data Layers (simulated)
│   ├── GPS Layer           ← Road speed + congestion via Maps API simulation
│   ├── CCTV CV Layer       ← YOLO bounding box output per camera
│   └── LSTM Layer          ← 3-horizon jam prediction model
│
├── Fusion Engine           ← Cross-validates GPS vs CV data
├── GIS Map                 ← Canvas-based road network with vehicle animation
├── Forecast Chart          ← 60-minute density prediction chart
└── Event Log               ← Real-time system alerts
```

---

## Tech Stack

- **Vanilla JavaScript** — no frameworks, no libraries
- **HTML5 Canvas** — dual canvas (map + CCTV + forecast chart)
- **CSS Custom Properties** — cohesive design token system
- **Google Fonts** — Syne, DM Mono, Instrument Sans
- **requestAnimationFrame** — 60fps simulation loop

---

## To Run

```bash
# Option 1 — Open directly
open index.html

# Option 2 — Serve locally
python3 -m http.server 8080
# Visit: http://localhost:8080
```

---

## GitHub Pages Deployment

```bash
git init
git add index.html README.md
git commit -m "TrafficIQ - Hybrid Predictive Traffic Intelligence Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/trafficiq-dashboard.git
git push -u origin main
```

Then: **Settings → Pages → Source: main → / (root) → Save**

Live URL: `https://YOUR_USERNAME.github.io/trafficiq-dashboard/`

---

## Roadmap (Production Extensions)

- [ ] Integrate real Google Maps JavaScript API + Traffic Layer
- [ ] Connect live CCTV RTSP streams via WebRTC
- [ ] Deploy actual LSTM model via TensorFlow.js
- [ ] Add WebSocket for multi-user real-time sync
- [ ] Integrate HERE Maps or Mapbox for base tiles
- [ ] Add route ETA prediction with turn-by-turn delay

---

*Built for hiring assessment — Problem Statement 4: Multi-Source Fusion for Predictive Traffic Congestion Modeling*
