import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, Check, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (perfumeId: string, size: '50ml' | '100ml', newQty: number) => void;
  onRemoveItem: (perfumeId: string, size: '50ml' | '100ml') => void;
  onClearCart: () => void;
  onCheckout: (discountAmount: number, shippingCost: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon === 'PRIMEIRA10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'AURA20') {
    discount = Math.min(subtotal, 20);
  }

  // Shipping logic: free over R$ 250, otherwise R$ 18
  const freeShippingThreshold = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = shippingCalculated ? (isFreeShipping ? 0 : 18) : 0;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'PRIMEIRA10' || clean === 'AURA20') {
      setAppliedCoupon(clean);
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido. Experimente: PRIMEIRA10');
    }
  };

  const handleCalcShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setShippingCalculated(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideLeft border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="font-serif text-xl font-bold text-stone-900">Seu Carrinho</h2>
            <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-medium">
              {items.reduce((acc, it) => acc + it.quantity, 0)} itens
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-amber-50/70 px-4 py-2.5 border-b border-amber-100 text-xs text-amber-950">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-2 font-medium text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Parabéns! Você ganhou <strong>Frete Grátis</strong> para todo Brasil.</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Faltam <strong>R$ {freeShippingThreshold - subtotal},00</strong> para Frete Grátis</span>
                <span>{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-800 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg text-stone-800 font-semibold">Seu carrinho está vazio</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Navegue pelas nossas fragrâncias exclusivas e adicione as suas favoritas.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={`${item.perfume.id}-${item.size}`}
                  className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 items-center"
                >
                  <img
                    src={item.perfume.image}
                    alt={item.perfume.name}
                    className="w-16 h-20 object-cover rounded-lg bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-sm text-stone-900 truncate">
                      {item.perfume.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Frasco de {item.size} · {item.perfume.concentration}
                    </p>
                    <div className="text-xs font-bold text-stone-900 mt-1">
                      R$ {item.price},00
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.perfume.id, item.size, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.perfume.id, item.size, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.perfume.id, item.size)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-xs font-bold text-stone-900 self-start">
                    R$ {item.price * item.quantity},00
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors underline"
                >
                  Limpar todo o carrinho
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer / Calculations & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            {/* Coupon field */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Cupom (ex: PRIMEIRA10)"
                  className="w-full bg-white border border-stone-300 rounded-lg pl-8 pr-2 py-2 text-xs uppercase text-stone-800 placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-stone-700 transition-colors"
              >
                Aplicar
              </button>
            </form>
            {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-1.5 rounded border border-emerald-200">
                <span>Cupom <strong>{appliedCoupon}</strong> ativo!</span>
                <button
                  onClick={() => setAppliedCoupon(null)}
                  className="text-stone-400 hover:text-stone-800 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* CEP Simulator */}
            <form onSubmit={handleCalcShipping} className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Truck className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                <input
                  type="text"
                  maxLength={9}
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                  placeholder="Calcular CEP de entrega"
                  className="w-full bg-white border border-stone-300 rounded-lg pl-8 pr-2 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs font-medium hover:bg-stone-300 transition-colors"
              >
                Calcular
              </button>
            </form>

            {/* Summary lines */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal},00</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Desconto de Cupom</span>
                  <span>- R$ {discount},00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frete</span>
                <span>
                  {shippingCalculated
                    ? shippingCost === 0
                      ? 'Grátis'
                      : `R$ ${shippingCost},00`
                    : 'A calcular no checkout'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Estimado</span>
                <span className="font-serif text-base">R$ {total},00</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => onCheckout(discount, shippingCost)}
              className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Prosseguir para Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
