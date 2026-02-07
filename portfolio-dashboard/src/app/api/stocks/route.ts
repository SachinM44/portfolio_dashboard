import { NextResponse } from 'next/server';
import holdingsData from '@/data/holdings.json';
import { Stock, Sector, PortfolioData } from '@/types/portfolio';
import { fetchAllStockPrices } from '@/services/yahooFinance';
import { fetchAllGoogleData } from '@/services/googleFinance';

interface RawStock {
    id: string;
    name: string;
    purchasePrice: number;
    qty: number;
    exchange: string;
}

interface RawSector {
    name: string;
    stocks: RawStock[];
}

export async function GET() {
    try {
        // Get all stock symbols
        const allSymbols: string[] = [];
        (holdingsData.sectors as RawSector[]).forEach(sector => {
            sector.stocks.forEach(stock => {
                allSymbols.push(stock.exchange);
            });
        });

        // Fetch data from both APIs in parallel
        const [yahooQuotes, googleData] = await Promise.all([
            fetchAllStockPrices(allSymbols),     // CMP + P/E + EPS from Yahoo
            fetchAllGoogleData(allSymbols)        // P/E & Earnings from Google (fallback)
        ]);

        let totalInvestment = 0;
        let totalPresentValue = 0;

        const sectors: Sector[] = (holdingsData.sectors as RawSector[]).map(sector => {
            let sectorInvestment = 0;
            let sectorPresentValue = 0;

            const stocks: Stock[] = sector.stocks.map(stock => {
                const investment = stock.purchasePrice * stock.qty;
                sectorInvestment += investment;
                totalInvestment += investment;

                // Get data from Yahoo Finance
                const yahoo = yahooQuotes.get(stock.exchange);
                const google = googleData.get(stock.exchange);

                // CMP from Yahoo
                const cmp = yahoo?.cmp ?? null;

                // P/E: Try Yahoo first, then Google as fallback
                const peRatio = yahoo?.peRatio ?? google?.peRatio ?? null;

                // Latest Earnings (EPS): Try Yahoo first, then Google as fallback
                let latestEarnings: string | null = null;
                if (yahoo?.eps) {
                    latestEarnings = `₹${yahoo.eps.toFixed(2)}`;
                } else if (google?.latestEarnings) {
                    latestEarnings = google.latestEarnings;
                }

                const presentValue = cmp ? cmp * stock.qty : null;
                const gainLoss = presentValue !== null ? presentValue - investment : null;

                if (presentValue !== null) {
                    sectorPresentValue += presentValue;
                    totalPresentValue += presentValue;
                }

                return {
                    id: stock.id,
                    name: stock.name,
                    purchasePrice: stock.purchasePrice,
                    qty: stock.qty,
                    investment,
                    portfolioPercent: 0,
                    exchange: stock.exchange,
                    cmp,
                    presentValue,
                    gainLoss,
                    peRatio,
                    latestEarnings,
                    sector: sector.name
                };
            });

            return {
                name: sector.name,
                stocks,
                totalInvestment: sectorInvestment,
                totalPresentValue: sectorPresentValue > 0 ? sectorPresentValue : null,
                totalGainLoss: sectorPresentValue > 0 ? sectorPresentValue - sectorInvestment : null
            };
        });

        // Calculate portfolio percentage
        sectors.forEach(sector => {
            sector.stocks.forEach(stock => {
                stock.portfolioPercent = (stock.investment / totalInvestment) * 100;
            });
        });

        const portfolioData: PortfolioData = {
            sectors,
            totalInvestment,
            totalPresentValue: totalPresentValue > 0 ? totalPresentValue : null,
            totalGainLoss: totalPresentValue > 0 ? totalPresentValue - totalInvestment : null,
            lastUpdated: new Date().toISOString()
        };

        return NextResponse.json(portfolioData);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
    }
}
