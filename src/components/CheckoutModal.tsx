import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, QrCode, CreditCard, MessageCircle, Copy, Check, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  shipping: number;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  shipping,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'whatsapp'>('pix');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const pixDiscount = paymentMethod === 'pix' ? Math.round((subtotal - discount) * 0.05) : 0;
  const total = Math.max(0, subtotal - discount - pixDiscount + shipping);

  const orderNumber = 'AUR-' + Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (paymentMethod === 'whatsapp') {
      const summaryText = items
        .map((i) => `• ${i.perfume.name} (${i.size}) x${i.quantity} = R$ ${i.price * i.quantity}`)
        .join('\n');
      const message = encodeURIComponent(
        `Olá! Gostaria de finalizar meu pedido na Aura Parfums:\n\n${summaryText}\n\n*Total:* R$ ${total},00\n*Nome:* ${name}\n*Endereço:* ${address} - ${city}`
      );
      window.open(`https://wa.me/5511999998888?text=${message}`, '_blank');
    }

    setIsCompleted(true);
    onSuccess();
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(
      '00020126580014br.gov.bcb.pix0136aura-parfums-pagamento@aura.com.br520400005303986540' +
        total +
        '.005802BR5920AURA PARFUMS STORE6009SAO PAULO62070503***6304ABCD'
    );
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="border-b border-stone-200 pb-4 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-semibold block">
                Finalização Segura
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Concluir Pedido
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Revise os itens e preencha os dados para entrega segura.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Beatriz Lima"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">WhatsApp / Celular *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-medium mb-1">Endereço e Número *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua Oscar Freire, 1200 - Apto 42"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Cidade / UF *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="São Paulo - SP"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <label className="block text-stone-700 font-medium mb-2">Forma de Pagamento:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'pix'
                        ? 'border-amber-800 bg-amber-50/60 text-stone-900 font-semibold shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-amber-800" />
                    <span>PIX (-5% extra)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'cartao'
                        ? 'border-amber-800 bg-amber-50/60 text-stone-900 font-semibold shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-stone-800" />
                    <span>Cartão (6x s/ juros)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50 text-stone-900 font-semibold shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Order Breakdown Box */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Itens selecionados ({items.length})</span>
                  <span>R$ {subtotal},00</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Desconto de Cupom</span>
                    <span>- R$ {discount},00</span>
                  </div>
                )}
                {pixDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Desconto Especial PIX (5%)</span>
                    <span>- R$ {pixDiscount},00</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping},00`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Final:</span>
                  <span className="font-serif text-lg text-amber-950">R$ {total},00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Compra protegida com criptografia SSL e garantia de satisfação 7 dias.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors shadow-md mt-4 cursor-pointer"
              >
                {paymentMethod === 'whatsapp'
                  ? 'Finalizar Pedido pelo WhatsApp'
                  : `Confirmar Pedido · R$ ${total},00`}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
                Pedido Gerado com Sucesso!
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Obrigado pela sua compra, {name}!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Código do Pedido: <strong className="text-stone-900">{orderNumber}</strong>
              </p>
            </div>

            {paymentMethod === 'pix' && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">
                    Chave PIX Copia e Cola (R$ {total},00)
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-medium">
                    Expira em 30 min
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded border border-amber-200/80 font-mono text-[11px] text-stone-600 break-all select-all">
                  00020126580014br.gov.bcb.pix0136aura-parfums-pagamento@aura.com.br520400005303986540{total}.005802BR5920AURA
                </div>
                <button
                  type="button"
                  onClick={copyPixCode}
                  className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedPix ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Chave PIX Copiada com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código PIX</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="bg-stone-50 p-4 rounded-xl text-left border border-stone-200 text-xs space-y-1.5 text-stone-600">
              <p>📦 <strong>Previsão de Envio:</strong> Próximo dia útil com código de rastreamento.</p>
              <p>🎁 <strong>Brindes Inclusos:</strong> 2 amostras de 2ml das novidades da estação.</p>
              <p>📍 <strong>Destino:</strong> {address}, {city}</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
            >
              Voltar à Loja
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
