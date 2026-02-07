'use client';

import { Stock } from '@/types/portfolio';
import { memo } from 'react';
import { formatCurrency, getGainLossClass } from '@/utils/format';

interface StockRowProps {
    stock: Stock;
    index: number;
}

function StockRowComponent({ stock, index }: StockRowProps) {
    return (
        <tr className="border-t border-gray-200 hover:bg-gray-100">
            <td className="px-3 py-2 text-gray-600">{index}</td>
            <td className="px-3 py-2 text-gray-800">{stock.name}</td>
            <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(stock.purchasePrice)}</td>
            <td className="px-3 py-2 text-right text-gray-700">{stock.qty}</td>
            <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(stock.investment)}</td>
            <td className="px-3 py-2 text-right text-gray-700">{stock.portfolioPercent.toFixed(2)}%</td>
            <td className="px-3 py-2 text-center text-blue-600 font-mono text-xs">{stock.exchange}</td>
            <td className="px-3 py-2 text-right font-medium text-gray-800">{formatCurrency(stock.cmp)}</td>
            <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(stock.presentValue)}</td>
            <td className={`px-3 py-2 text-right font-medium ${getGainLossClass(stock.gainLoss)}`}>
                {formatCurrency(stock.gainLoss)}
            </td>
            <td className="px-3 py-2 text-right text-gray-700">
                {stock.peRatio !== null ? stock.peRatio.toFixed(2) : '-'}
            </td>
            <td className="px-3 py-2 text-right text-gray-700">{stock.latestEarnings ?? '-'}</td>
        </tr>
    );
}

export const StockRow = memo(StockRowComponent);
