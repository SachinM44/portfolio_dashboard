import axios from 'axios';
import * as cheerio from 'cheerio';

export interface GoogleFinanceData {
    symbol: string;
    peRatio: number | null;
    latestEarnings: string | null;
}

export async function fetchGoogleFinanceData(symbol: string): Promise<GoogleFinanceData> {
    try {
        const url = `https://www.google.com/finance/quote/${symbol}:NSE`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);
        let peRatio: number | null = null;
        let latestEarnings: string | null = null;

        $('[data-source="P/E ratio"]').each((_, el) => {
            const value = $(el).parent().find('[class*="P6K39c"]').text();
            if (value) peRatio = parseFloat(value.replace(/,/g, ''));
        });
        $('[data-source="EPS"]').each((_, el) => {
            const value = $(el).parent().find('[class*="P6K39c"]').text();
            if (value) latestEarnings = '₹' + value;
        });

        return { symbol, peRatio, latestEarnings };
    } catch {
        return { symbol, peRatio: null, latestEarnings: null };
    }
}

export async function fetchAllGoogleData(symbols: string[]): Promise<Map<string, GoogleFinanceData>> {
    const results = new Map<string, GoogleFinanceData>();

    for (const symbol of symbols) {
        const data = await fetchGoogleFinanceData(symbol);
        results.set(symbol, data);
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    return results;
}
