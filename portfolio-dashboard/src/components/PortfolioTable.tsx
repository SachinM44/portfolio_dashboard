'use client';

import { PortfolioData } from '@/types/portfolio';
import { SectorGroup } from './SectorGroup';
import { formatCurrency, getGainLossClass } from '@/utils/format';

interface PortfolioTableProps {
    data: PortfolioData;
}

export function PortfolioTable({ data }: PortfolioTableProps) {
    let currentIndex = 0;

    return (
        <div className="bg-white border border-gray-300 rounded overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-3 py-2 text-left font-medium border-r border-gray-700">No</th>
                            <th className="px-3 py-2 text-left font-medium border-r border-gray-700">Particulars</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">Purchase Price</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">Qty</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">Investment</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">Portfolio %</th>
                            <th className="px-3 py-2 text-center font-medium border-r border-gray-700">NSE/BSE</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">CMP</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">Present Value</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">Gain/Loss</th>
                            <th className="px-3 py-2 text-right font-medium border-r border-gray-700">P/E Ratio</th>
                            <th className="px-3 py-2 text-right font-medium">Latest Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.sectors.map(sector => {
                            const sectorStartIndex = currentIndex;
                            currentIndex += sector.stocks.length;
                            return (
                                <SectorGroup
                                    key={sector.name}
                                    sector={sector}
                                    startIndex={sectorStartIndex}
                                />
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-200 font-bold border-t-2 border-gray-400">
                            <td colSpan={4} className="px-3 py-2 text-gray-800">Grand Total</td>
                            <td className="px-3 py-2 text-right text-gray-800">{formatCurrency(data.totalInvestment)}</td>
                            <td className="px-3 py-2 text-right text-gray-800">100%</td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2 text-right text-gray-800">
                                {formatCurrency(data.totalPresentValue)}
                            </td>
                            <td className={`px-3 py-2 text-right font-bold ${getGainLossClass(data.totalGainLoss)}`}>
                                {formatCurrency(data.totalGainLoss)}
                            </td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
