# Xandeum Explorer (XNodes Dashboard)

Xandeum Explorer is a production-ready, high-performance dashboard designed to monitor and interact with the Xandeum Network. Built for the Solana ecosystem, it provides real-time visibility into validator nodes (PNodes), network health analytics, and on-chain financial operations like staking and swapping.

##  Live Features

###  Real-Time Analytics & Monitoring
- **Network Health Trend**: Live 24h health score tracking with automated fail-fast RPC monitoring.
- **Node Directory**: Searchable directory of all PNodes with instant visibility into software versions and IP addresses.
- **Advanced Charts**: Visual distribution of software versions, regional node density, and performance metrics (CPU vs. RAM).
- **Leaderboard**: Real-time ranking based on **podCredits** calculated from uptime, storage capacity, and CPU efficiency.

###  DeFi & Staking (Devnet)
- **Native Staking**: Create stake accounts and delegate SOL to Xandeum validators directly from the UI.
- **XAND Swap**: Integrated swap terminal with on-chain memo recording and simulated liquidity pool interactions.
- **Trading Terminal**: Real-time price tracking for SOL (via CoinGecko) and XAND, including 24h volume and market cap metrics.

###  Premium UI/UX
- **Glassmorphism 2.0**: A sleek, modern dark-mode aesthetic with semi-transparent panels and vibrant accents.
- **Responsive Design**: Optimized for everything from large trading monitors to mobile devices.
- **Contextual Wallet Integration**: Intelligent wallet connectivity that only appears when needed (Stake/Swap pages).

##  Tech Stack
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **UI & Styling**: React 19, Tailwind CSS, Lucide Icons
- **Blockchain**: [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/), Solana Wallet Adapter
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: Custom PNode Client with 60s caching and 1s RPC fail-fast optimization.

##  Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- A Solana wallet (e.g., Phantom, Solflare) set to **Devnet**.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Anantdadhich/xandeum.git
   cd xandeum
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Network Configuration
This dashboard is currently configured to run on **Solana Devnet**. Ensure your wallet is switched to Devnet to perform staking or swap transactions.

## Build By 
- [Anantdadhich](https://github.com/Anantdadhich)
- [notcodesid](https://github.com/notcodesid)

