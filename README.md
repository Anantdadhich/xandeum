# Xandeum Explorer (XNodes Dashboard)

Welcome to the Xandeum Explorer, a live, production-ready dashboard built to monitor the Xandeum storage network. This tool isn't just a static display—it's a real-time command center for the entire network ecosystem.

We built this to give the community a crystal-clear view into the health, performance, and growth of the Xandeum pNode network.

## 🌟 Live Features

### 📊 Real-Time Network Analytics
Get a pulse on the network with data that updates live from the blockchain:
- **Health Trend**: Watch the 24-hour network health score evolve in real-time.
- **Global Heatmap**: See exactly when and where the network is most active.
- **Version Distribution**: Instantly spot which software versions nodes are running.
- **Resource Monitoring**: Track CPU vs. RAM efficiency across the entire decentralized network.

### 🌍 Interactive Node Map
Visualize the physical decentralization of the network. We've integrated a **Live Geo-Map** that plots active pNodes around the globe, giving you a tangible sense of the network's physical footprint.

### 📋 Smart Node Directory
More than just a list—it's a power tool for analysis:
- **Live Search**: Find any node by Public Key or IP address instantly.
- **Deep Filters**: Drill down by Status (Healthy/Offline) or Software Version.
- **📥 Export Data**: Need to run your own analysis? One click exports the full node dataset to CSV.

### 🏆 Dynamic Leaderboard
See who's contributing the most. Our leaderboard tracks the top-performing nodes based on real **podCredits**, calculated from a mix of:
- Uptime consistency
- Storage capacity provided
- CPU efficiency scores

### 💰 DeFi Integration (Devnet)
We've integrated full financial capabilities right into the dashboard:
- **Native Staking**: Delegate SOL to Xandeum validators directly through the UI.
- **XAND Swap**: A fully functional swap terminal that records unique "Proof of Swap" memos on-chain.
- **Live Trading Terminal**: Watch real-time market data for SOL (powered by CoinGecko) and XAND, including price, volume, and market cap.

### ℹ️ Ease of Use
- **"About" Context**: New to Xandeum? Our built-in info modal explains the pNode ecosystem in plain English.
- **Premium Design**: Built with a sleek "Glassmorphism" aesthetic that looks great on any screen, from mobile to ultra-wide monitors.

## 🚀 Tech Stack
Built for speed and reliability:
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Data**: Custom RPC Client with "Fail-Fast" technology (1s timeouts) for snappy performace.
- **Maps**: Leaflet.js for beautiful, interactive data visualization.

## 🏁 Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/Anantdadhich/xandeum.git
   cd xandeum
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

---
*Built with ❤️ for the Xandeum Bounty 2025*
