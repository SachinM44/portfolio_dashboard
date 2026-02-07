export interface Stock {
  id: string;
  name: string;
  purchasePrice: number;
  qty: number;
  investment: number;
  portfolioPercent: number;
  exchange: string;
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  peRatio: number | null;
  latestEarnings: string | null;
  sector: string;
}

export interface Sector {
  name: string;
  stocks: Stock[];
  totalInvestment: number;
  totalPresentValue: number | null;
  totalGainLoss: number | null;
}

export interface PortfolioData {
  sectors: Sector[];
  totalInvestment: number;
  totalPresentValue: number | null;
  totalGainLoss: number | null;
  lastUpdated: string;
}

export interface StockQuote {
  symbol: string;
  cmp: number | null;
  peRatio: number | null;
  latestEarnings: string | null;
}
