'use client';

import { useState, useEffect, useCallback } from 'react';
import { PortfolioTable } from '@/components/PortfolioTable';
import { PortfolioData } from '@/types/portfolio';
import { formatCurrency } from '@/utils/format';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/stocks');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setPortfolioData(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-300 py-10 px-10">
        <header className="flex flex-row justify-center pb-4">
          <div>
            <h1 className="text-2xl font-bold rounded-lg p-4 text-gray-800">Portfolio Dashboard</h1>
            <p className="text-sm text-gray-600 pb-10 mt-25">Real-time stock tracking</p>
          </div>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            Error: {error}
          </div>
        )}

        {portfolioData && (
          <div className="mb-4 flex gap-4">
            <div className="bg-white border border-gray-300 rounded px-4 py-3">
              <p className="text-xs text-gray-500 uppercase">Total Investment</p>
              <p className="text-lg font-bold text-gray-800">{formatCurrency(portfolioData.totalInvestment)}</p>
            </div>
            <div className="bg-white border border-gray-300 rounded px-4 py-3">
              <p className="text-xs text-gray-500 uppercase">Present Value</p>
              <p className="text-lg font-bold text-gray-800">{formatCurrency(portfolioData.totalPresentValue)}</p>
            </div>
            <div className="bg-white border border-gray-300 rounded px-4 py-3">
              <p className="text-xs text-gray-500 uppercase">Total Gain/Loss</p>
              <p className={`text-lg font-bold ${portfolioData.totalGainLoss && portfolioData.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioData.totalGainLoss)}
              </p>
            </div>
          </div>
        )}

        {loading && !portfolioData ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading portfolio data...</div>
          </div>
        ) : portfolioData ? (
          <PortfolioTable data={portfolioData} />
        ) : null}

        <footer className="mt-4 text-center text-xs text-gray-400">
          Data refreshes every 15 seconds
        </footer>
    </div>
  );
}
