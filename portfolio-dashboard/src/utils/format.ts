export function formatCurrency(value: number | null): string {
    if (value === null) return '-';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(value);
}

export function getGainLossClass(value: number | null): string {
    if (value === null) return 'text-gray-400';
    return value >= 0 ? 'text-green-600' : 'text-red-600';
}
