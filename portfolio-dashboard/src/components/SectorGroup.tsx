'use client';

import { Sector } from '@/types/portfolio';
import { StockRow } from './StockRow';
import { useState } from 'react';
import { formatCurrency, getGainLossClass } from '@/utils/format';

interface SectorGroupProps {
    sector: Sector;
    startIndex: number;
}

export function SectorGroup({ sector, startIndex }: SectorGroupProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const portfolioPercent = sector.stocks.reduce((sum, stock) => sum + stock.portfolioPercent, 0);

    return (
        <>
            <tr
                className="bg-gray-100 border-t border-gray-300 cursor-pointer hover:bg-gray-300"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <td colSpan={2} className="px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
                        <span className="font-bold text-gray-800">{sector.name}</span>
                    </div>
                </td>
                <td className="px-3 py-2 text-right"></td>
                <td className="px-3 py-2 text-right"></td>
                <td className="px-3 py-2 text-right font-semibold text-gray-800">{formatCurrency(sector.totalInvestment)}</td>
                <td className="px-3 py-2 text-right font-semibold text-gray-800">{portfolioPercent.toFixed(2)}%</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2 text-right font-semibold text-gray-800">
                    {formatCurrency(sector.totalPresentValue)}
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${getGainLossClass(sector.totalGainLoss)}`}>
                    {formatCurrency(sector.totalGainLoss)}
                </td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
            </tr>
            {isExpanded && sector.stocks.map((stock, idx) => (
                <StockRow key={stock.id} stock={stock} index={startIndex + idx + 1} />
            ))}
        </>
    );
}
