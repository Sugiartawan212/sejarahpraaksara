'use client';

interface PriceDisplayProps {
  priceIDR: number;
  className?: string;
  showLabel?: boolean;
}

export default function PriceDisplay({ priceIDR, className = '', showLabel = false }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    if (price >= 1_000_000_000) {
      return `Rp ${(price / 1_000_000_000).toFixed(price % 1_000_000_000 === 0 ? 0 : 1)} Miliar`;
    }
    if (price >= 1_000_000) {
      return `Rp ${Math.round(price / 1_000_000)} Juta`;
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <span className={className}>
      {showLabel && (
        <span className="text-xs font-semibold opacity-70 mr-1 uppercase tracking-wider">
          IDR
        </span>
      )}
      {formatPrice(priceIDR)}
    </span>
  );
}
