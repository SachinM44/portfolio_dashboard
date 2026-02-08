# Portfolio Dashboard

 **Live Demo**: https://portfolio-dashboard-kvgfrn2dw-sachins-projects-101ada71.vercel.app/

 **GitHub**: https://github.com/SachinM44/portfolio_dashboard.git

---
## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SachinM44/portfolio_dashboard.git
cd portfolio_dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### API Integration

**Yahoo Finance (CMP + P/E)**
- Uses `yahoo-finance2` npm package
- Fetches `regularMarketPrice` for CMP
- Fetches `trailingPE` for P/E Ratio
- Fetches `epsTrailingTwelveMonths` for Earnings

**Google Finance (Fallback for P/E + Earnings)**
- Web scraping using `cheerio` and `axios`
- Extracts P/E Ratio and EPS from HTML

### Live Updates

- Dashboard refreshes every **15 seconds**
- Only updates during market hours (9:15 AM - 3:30 PM IST, Mon-Fri)
- Outside market hours, displays last closing prices

