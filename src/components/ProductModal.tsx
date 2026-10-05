import React, { useState } from 'react';
import { Perfume } from '../types';
import { X, Star, ShoppingBag, ShieldCheck, Clock, Sparkles, Check } from 'lucide-react';
import { formatMetical } from '../utils/format';

interface ProductModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: '50ml' | '100ml', quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
}) => {
  if (!perfume) return null;

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const price = selectedSize === '50ml' ? perfume.price50ml : perfume.price100ml;
  const totalPrice = price * quantity;

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-stone-100 rounded-full transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative bg-stone-100 aspect-square md:aspect-auto h-72 md:h-full">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs space-y-1">
              <div className="flex justify-between items-center text-stone-300">
                <span>Concentração:</span>
                <span className="font-semibold text-white">{perfume.concentration}</span>
              </div>
              <div className="flex justify-between items-center text-stone-300">
                <span>Família Olfativa:</span>
                <span className="font-semibold text-white">{perfume.family}</span>
              </div>
            </div>
          </div>

          {/* Right: Olfactory Details & Buy */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="capitalize font-medium text-amber-800 tracking-wider">
                  {perfume.category} · {perfume.family}
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(perfume.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-stone-700">{perfume.rating}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 leading-tight">
                {perfume.name}
              </h2>
              <p className="text-sm text-stone-500 font-light mt-1">{perfume.subtitle}</p>
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {perfume.description}
              </p>

              {/* Olfactory Pyramid (Pirâmide Olfativa) */}
              <div className="mt-5 pt-4 border-t border-stone-200">
                <h4 className="text-xs font-bold tracking-wider uppercase text-stone-900 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Pirâmide Olfativa
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="font-semibold text-stone-800 block mb-0.5">
                      Notas de Saída (Topo):
                    </span>
                    <span className="text-stone-600">{perfume.topNotes.join(' · ')}</span>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="font-semibold text-stone-800 block mb-0.5">
                      Notas de Coração (Corpo):
                    </span>
                    <span className="text-stone-600">{perfume.heartNotes.join(' · ')}</span>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="font-semibold text-stone-800 block mb-0.5">
                      Notas de Fundo (Fixação):
                    </span>
                    <span className="text-stone-600">{perfume.baseNotes.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Performance indicators */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-stone-600">
                <div className="flex items-center gap-2 p-2 rounded bg-amber-50/50 border border-amber-100">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-stone-500">Fixação na pele</span>
                    <span className="font-semibold text-stone-900">{perfume.longevity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-amber-50/50 border border-amber-100">
                  <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-stone-500">Projeção & Rastro</span>
                    <span className="font-semibold text-stone-900">{perfume.projection}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Size, Quantity & Add button */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              {/* Size and Quantity selector */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500 block mb-1">Tamanho do Frasco:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSize('50ml')}
                      className={`text-xs px-3 py-1.5 rounded-md font-medium border transition-all ${
                        selectedSize === '50ml'
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                      }`}
                    >
                      50ml - {formatMetical(perfume.price50ml)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSize('100ml')}
                      className={`text-xs px-3 py-1.5 rounded-md font-medium border transition-all ${
                        selectedSize === '100ml'
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                      }`}
                    >
                      100ml - {formatMetical(perfume.price100ml)}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-stone-500 block mb-1">Quantidade:</span>
                  <div className="flex items-center border border-stone-300 rounded-md">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price total and action */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <div>
                  <div className="text-2xl font-serif font-bold text-stone-900">
                    {formatMetical(totalPrice)}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    M-Pesa · e-Mola · Entrega em todo Moçambique
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 text-white hover:bg-amber-900'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Item Adicionado!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar ao Cesto</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
