import React, { useState } from 'react';
import { Perfume } from '../types';
import { Star, Check, Plus, Eye } from 'lucide-react';
import { formatMetical } from '../utils/format';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, size: '50ml' | '100ml') => void;
  onViewDetails: (perfume: Perfume) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  perfume,
  onAddToCart,
  onViewDetails,
}) => {
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = selectedSize === '50ml' ? perfume.price50ml : perfume.price100ml;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(perfume, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <div
      onClick={() => onViewDetails(perfume)}
      className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle status tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {perfume.isBestseller && (
            <span className="text-[11px] font-medium tracking-wider uppercase bg-stone-900/90 text-white px-2.5 py-0.5 rounded shadow-sm">
              Mais Vendido
            </span>
          )}
          {perfume.isNew && (
            <span className="text-[11px] font-medium tracking-wider uppercase bg-amber-800/90 text-white px-2.5 py-0.5 rounded shadow-sm">
              Novidade
            </span>
          )}
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(perfume);
            }}
            className="px-4 py-2 bg-white/95 backdrop-blur-sm text-stone-900 rounded-full text-xs font-medium shadow-md hover:bg-white flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Notas Olfativas</span>
          </button>
        </div>

        {/* Category & Concentration tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/90 bg-stone-950/60 backdrop-blur-xs px-2.5 py-1 rounded">
          <span>{perfume.concentration}</span>
          <span className="capitalize">{perfume.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(perfume.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-stone-700">{perfume.rating.toFixed(1)}</span>
            <span className="text-stone-400">({perfume.reviewsCount})</span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
            {perfume.name}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{perfume.subtitle}</p>

          {/* Main notes snippet */}
          <div className="mt-3 text-xs text-stone-600 line-clamp-1 bg-stone-50 py-1 px-2 rounded border border-stone-100">
            <span className="text-stone-400 font-medium">Notas:</span> {perfume.topNotes.slice(0, 2).join(', ')} & {perfume.baseNotes[0]}
          </div>

          {/* Size Selector */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-stone-500">Frasco:</span>
            <div className="flex items-center gap-1.5 bg-stone-100 p-0.5 rounded-md" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedSize('50ml')}
                className={`text-xs px-2.5 py-1 rounded transition-colors font-medium ${
                  selectedSize === '50ml'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                50ml
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize('100ml')}
                className={`text-xs px-2.5 py-1 rounded transition-colors font-medium ${
                  selectedSize === '100ml'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                100ml
              </button>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-serif font-bold text-stone-900">
              {formatMetical(currentPrice)}
            </div>
            <div className="text-[11px] text-stone-500">
              M-Pesa · e-Mola · Cartão
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 text-white hover:bg-amber-900'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>No cesto</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

