# Portfolio Dashboard

A dynamic portfolio dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Portfolio table with all required columns
- Sector grouping with collapsible sections
- Color-coded gain/loss (green/red)
- Auto-refresh every 15 seconds
- Responsive design

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Data**: Mock stock prices (API integration ready)

## Project Structure

```
src/
├── app/
│   ├── api/stocks/route.ts    # API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── components/
│   ├── PortfolioTable.tsx     # Main table
│   ├── SectorGroup.tsx        # Sector grouping
│   └── StockRow.tsx           # Stock row
├── data/
│   └── holdings.json          # Portfolio data
├── types/
│   └── portfolio.ts           # TypeScript types
└── utils/
    └── format.ts              # Formatting utilities
```

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Columns Displayed

1. No (Row number)
2. Particulars (Stock name)
3. Purchase Price
4. Qty
5. Investment
6. Portfolio %
7. NSE/BSE
8. CMP
9. Present Value
10. Gain/Loss
11. P/E Ratio
12. Latest Earnings
