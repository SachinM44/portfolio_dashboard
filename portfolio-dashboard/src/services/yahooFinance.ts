import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export interface StockQuote {
    symbol: string;
    cmp: number | null;
    peRatio: number | null;
    eps: number | null;
}

export async function fetchStockPrice(symbol: string): Promise<StockQuote> {
    try {
        const nseSymbol = `${symbol}.NS`;
        const quote = await yahooFinance.quote(nseSymbol);

        const q = quote as {
            regularMarketPrice?: number;
            trailingPE?: number;
            epsTrailingTwelveMonths?: number;
        };

        return {
            symbol,
            cmp: q.regularMarketPrice ?? null,
            peRatio: q.trailingPE ?? null,
            eps: q.epsTrailingTwelveMonths ?? null
        };
    } catch {
        try {
            const bseSymbol = `${symbol}.BO`;
            const quote = await yahooFinance.quote(bseSymbol);

            const q = quote as {
                regularMarketPrice?: number;
                trailingPE?: number;
                epsTrailingTwelveMonths?: number;
            };

            return {
                symbol,
                cmp: q.regularMarketPrice ?? null,
                peRatio: q.trailingPE ?? null,
                eps: q.epsTrailingTwelveMonths ?? null
            };
        } catch {
            return { symbol, cmp: null, peRatio: null, eps: null };
        }
    }
}

export async function fetchAllStockPrices(symbols: string[]): Promise<Map<string, StockQuote>> {
    const results = new Map<string, StockQuote>();

    for (const symbol of symbols) {
        const quote = await fetchStockPrice(symbol);
        results.set(symbol, quote);
    }

    return results;
}
