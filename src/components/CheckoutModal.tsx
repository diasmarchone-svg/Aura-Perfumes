import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, Smartphone, CreditCard, MessageCircle, Copy, Check, ShieldCheck, MapPin } from 'lucide-react';
import { formatMetical } from '../utils/format';

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

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'transferencia' | 'whatsapp'>('mpesa');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Maputo Cidade');
  const [neighborhood, setNeighborhood] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount + shipping);

  const orderNumber = 'MOZ-' + Math.floor(100000 + Math.random() * 900000);

  const mpesaNumber = '84 555 7890';
  const emolaNumber = '87 555 7890';
  const bimNib = '0001 0000 0012 3456 7890 1';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (paymentMethod === 'whatsapp') {
      const summaryText = items
        .map((i) => `• ${i.perfume.name} (${i.size}) x${i.quantity} = ${formatMetical(i.price * i.quantity)}`)
        .join('\n');
      const message = encodeURIComponent(
        `Olá Aura Parfums Moçambique!\n\nGostaria de confirmar minha encomenda:\n\n${summaryText}\n\n*Total:* ${formatMetical(total)}\n*Cliente:* ${name}\n*Contacto:* ${phone}\n*Destino:* ${province} - Bairro ${neighborhood}, ${addressDetails}`
      );
      window.open(`https://wa.me/258845557890?text=${message}`, '_blank');
    }

    setIsCompleted(true);
    onSuccess();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
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
                Moçambique · Encomenda Segura
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Concluir Encomenda
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Preencha os dados para entrega rápida em Maputo, Matola ou Províncias.
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
                    placeholder="Ex: Samira Mondlane"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Contacto M-Pesa / Celular *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+258 84/87 123 4567"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              {/* Delivery Address in Mozambique */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Província / Cidade *</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800 bg-white"
                  >
                    <option value="Maputo Cidade">Maputo Cidade</option>
                    <option value="Maputo Província (Matola)">Maputo Província (Matola)</option>
                    <option value="Sofala (Beira)">Sofala (Beira)</option>
                    <option value="Nampula">Nampula</option>
                    <option value="Tete">Tete</option>
                    <option value="Zambézia (Quelimane)">Zambézia (Quelimane)</option>
                    <option value="Cabo Delgado (Pemba)">Cabo Delgado (Pemba)</option>
                    <option value="Gaza (Xai-Xai)">Gaza (Xai-Xai)</option>
                    <option value="Inhambane">Inhambane</option>
                    <option value="Manica (Chimoio)">Manica (Chimoio)</option>
                    <option value="Niassa (Lichinga)">Niassa (Lichinga)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Bairro *</label>
                  <input
                    type="text"
                    required
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Polana Cimento / Sommerschield"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Avenida, Rua ou Ponto de Referência *</label>
                <input
                  type="text"
                  required
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="Ex: Av. Julius Nyerere, Edifício Marés, Porta 3B"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-800"
                />
              </div>

              {/* Payment Methods in Mozambique */}
              <div className="pt-2">
                <label className="block text-stone-700 font-medium mb-2">Forma de Pagamento em Moçambique:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'mpesa'
                        ? 'border-red-600 bg-red-50 text-red-950 font-bold shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-red-600" />
                    <span>M-Pesa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('emola')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'emola'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-700" />
                    <span>e-Mola</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transferencia')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'transferencia'
                        ? 'border-stone-900 bg-stone-100 text-stone-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-stone-800" />
                    <span>BIM / BCI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
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
                  <span>Itens no cesto ({items.length})</span>
                  <span>{formatMetical(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Desconto de Cupom</span>
                    <span>- {formatMetical(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Taxa de Entrega</span>
                  <span>{shipping === 0 ? 'Grátis' : formatMetical(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Final:</span>
                  <span className="font-serif text-lg text-amber-950">{formatMetical(total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Perfumes 100% originais com entrega confirmada e acompanhamento pelo WhatsApp.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors shadow-md mt-4 cursor-pointer"
              >
                {paymentMethod === 'whatsapp'
                  ? 'Confirmar Encomenda pelo WhatsApp'
                  : `Confirmar Encomenda · ${formatMetical(total)}`}
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
                Encomenda Registada com Sucesso!
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Muito obrigado, {name}!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Referência: <strong className="text-stone-900">{orderNumber}</strong>
              </p>
            </div>

            {/* M-Pesa Instructions */}
            {paymentMethod === 'mpesa' && (
              <div className="bg-red-50/80 border border-red-200 rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-950">
                    Instruções M-Pesa ({formatMetical(total)})
                  </span>
                  <span className="text-[10px] bg-red-200 text-red-900 px-2 py-0.5 rounded font-semibold">
                    Vodacom
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1">
                  <p>1. Abra o M-Pesa no seu celular (<strong>*150#</strong> ou App M-Pesa).</p>
                  <p>2. Selecione <strong>Transferir Dinheiro</strong> para o número:</p>
                </div>
                <div className="bg-white p-2.5 rounded border border-red-200 font-mono text-sm font-bold text-stone-900 text-center select-all">
                  {mpesaNumber} (Aura Parfums Lda)
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(mpesaNumber)}
                  className="w-full py-2 bg-red-700 text-white rounded-lg text-xs font-medium hover:bg-red-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Número M-Pesa Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Número M-Pesa</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* e-Mola Instructions */}
            {paymentMethod === 'emola' && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">
                    Instruções e-Mola ({formatMetical(total)})
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-semibold">
                    Movitel
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1">
                  <p>1. Digite <strong>*898#</strong> no seu celular Movitel.</p>
                  <p>2. Envie o valor de <strong>{formatMetical(total)}</strong> para o número:</p>
                </div>
                <div className="bg-white p-2.5 rounded border border-amber-200 font-mono text-sm font-bold text-stone-900 text-center select-all">
                  {emolaNumber} (Aura Parfums Lda)
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(emolaNumber)}
                  className="w-full py-2 bg-amber-700 text-white rounded-lg text-xs font-medium hover:bg-amber-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Número e-Mola Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Número e-Mola</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* BIM / BCI Bank Transfer */}
            {paymentMethod === 'transferencia' && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-3">
                <span className="text-xs font-bold text-stone-900 block">
                  Transferência Bancária ({formatMetical(total)})
                </span>
                <div className="bg-white p-2.5 rounded border border-stone-200 font-mono text-xs text-stone-700 space-y-1">
                  <div><strong>Banco:</strong> Millennium BIM</div>
                  <div><strong>Titular:</strong> Aura Parfums Moçambique Lda</div>
                  <div><strong>NIB:</strong> {bimNib}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(bimNib)}
                  className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>NIB Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar NIB do Millennium BIM</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="bg-stone-50 p-4 rounded-xl text-left border border-stone-200 text-xs space-y-1.5 text-stone-600">
              <p>📦 <strong>Previsão de Entrega:</strong> 24h para Maputo/Matola e 48h a 72h para outras províncias.</p>
              <p>🎁 <strong>Ofertas Inclusas:</strong> 2 amostras de 2ml das fragrâncias mais exclusivas.</p>
              <p>📍 <strong>Destino:</strong> {neighborhood}, {addressDetails} - {province}</p>
            </div>

            <div className="flex gap-2 justify-center">
              <a
                href={`https://wa.me/258845557890?text=${encodeURIComponent(`Olá! Fiz a encomenda ${orderNumber} no valor de ${formatMetical(total)}. Segue o comprovativo:`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-700 text-white rounded-lg text-xs font-medium hover:bg-emerald-800 transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Comprovativo no WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-stone-200 text-stone-800 rounded-lg text-xs font-medium hover:bg-stone-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
