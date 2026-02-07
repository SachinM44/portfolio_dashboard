# Technical Document

## Overview

Portfolio dashboard for displaying stock holdings with real-time data updates.

## Challenges & Solutions

### 1. API Limitations
**Challenge**: Yahoo/Google Finance don't have official public APIs.
**Solution**: Used mock data with realistic stock prices. The architecture supports easy API integration when available.

### 2. Real-Time Updates
**Challenge**: Dashboard needs to show live data.
**Solution**: Used `setInterval` with 15-second refresh to periodically fetch updated data from the API.

### 3. Performance
**Challenge**: Prevent unnecessary re-renders with 26 stocks.
**Solution**: Used `React.memo` on StockRow component to memoize rows that haven't changed.

### 4. Code Reusability
**Challenge**: Multiple components needed same formatting functions.
**Solution**: Created `utils/format.ts` with shared `formatCurrency` and `getGainLossClass` functions.

### 5. Type Safety
**Challenge**: Ensure data consistency across components.
**Solution**: Defined TypeScript interfaces in `types/portfolio.ts` for Stock, Sector, and PortfolioData.

## Data Flow

```
holdings.json → API Route → Calculate values → Return JSON → Frontend → Display Table
```

## Key Decisions

1. **Next.js API Routes**: Single codebase for frontend and backend
2. **Tailwind CSS**: Rapid UI development with utility classes
3. **Collapsible Sectors**: Better UX for large portfolios
4. **Shared Utils**: DRY principle - format functions in one place
