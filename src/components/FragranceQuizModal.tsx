import React, { useState } from 'react';
import { Perfume } from '../types';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, Eye, Check } from 'lucide-react';
import { formatMetical } from '../utils/format';

interface FragranceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, size: '50ml' | '100ml') => void;
  onViewDetails: (perfume: Perfume) => void;
}

export const FragranceQuizModal: React.FC<FragranceQuizModalProps> = ({
  isOpen,
  onClose,
  perfumes,
  onAddToCart,
  onViewDetails,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [scentProfile, setScentProfile] = useState('');
  const [intensity, setIntensity] = useState('');
  const [matchedPerfume, setMatchedPerfume] = useState<Perfume | null>(null);
  const [added, setAdded] = useState(false);

  const resetQuiz = () => {
    setStep(1);
    setOccasion('');
    setScentProfile('');
    setIntensity('');
    setMatchedPerfume(null);
  };

  const calculateMatch = (finalOccasion: string, finalScent: string) => {
    let result = perfumes[0];

    if (finalScent === 'floral') {
      result = perfumes.find((p) => p.id === 'fleur-vanille') || perfumes[1];
    } else if (finalScent === 'citrico') {
      result = perfumes.find((p) => p.id === 'aqua-mediterraneo') || perfumes[2];
    } else if (finalScent === 'doce') {
      result = perfumes.find((p) => p.id === 'velvet-amber-tonka') || perfumes[1];
    } else if (finalScent === 'nicho') {
      result = perfumes.find((p) => p.id === 'oud-royal-arabie') || perfumes[3];
    } else if (finalOccasion === 'noite') {
      result = perfumes.find((p) => p.id === 'noir-sauvage') || perfumes[0];
    } else {
      result = perfumes.find((p) => p.id === 'santal-solis') || perfumes[2];
    }

    setMatchedPerfume(result);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 4 && (
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Consultor Olfativo · Passo {step} de 3</span>
            </div>

            {/* Step 1: Ocasião */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Para qual momento você deseja esse perfume?
                </h3>
                <p className="text-xs text-stone-500">
                  Selecione onde você mais quer ser notado(a):
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    { id: 'dia', label: '☀️ Dia a Dia & Trabalho', desc: 'Conforto elegante, frescor e presença agradável' },
                    { id: 'noite', label: '🌙 Noites, Festas & Baladas', desc: 'Marcante, sensual e com alto poder de atração' },
                    { id: 'romantico', label: '🕯️ Encontros Românticos', desc: 'Intimista, aveludado e envolvente' },
                    { id: 'exclusivo', label: '👑 Ocasiões de Gala & Alta Sociedade', desc: 'Luxo raro, complexo e memorável' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setOccasion(opt.id);
                        setStep(2);
                      }}
                      className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-amber-800 hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-stone-900 text-sm group-hover:text-amber-950">
                          {opt.label}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Família Olfativa */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Que tipo de notas mais te encantam?
                </h3>
                <p className="text-xs text-stone-500">
                  A alma aromática que mais combina com seu gosto:
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    { id: 'amadeirado', label: '🌲 Madeiras Nobres & Especiarias', desc: 'Sândalo, Cedro, Cardamomo e Couro' },
                    { id: 'floral', label: '🌸 Florais Cremosos & Baunilha', desc: 'Flor de Laranjeira, Jasmim e Baunilha Bourbon' },
                    { id: 'citrico', label: '🍋 Cítricos & Brisa Marinha', desc: 'Limão Siciliano, Hortelã e Frescor Oceânico' },
                    { id: 'doce', label: '🍯 Âmbar Doce & Fava Tonka', desc: 'Sensual, quente, caramelo e especiarias doces' },
                    { id: 'nicho', label: '🏺 Oud Árabe Raro & Resinas', desc: 'Oud genuíno, açafrão persa e rosas orientais' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setScentProfile(opt.id);
                        setStep(3);
                      }}
                      className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-amber-800 hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-stone-900 text-sm group-hover:text-amber-950">
                          {opt.label}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Intensidade */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Qual nível de intensidade você prefere?
                </h3>
                <p className="text-xs text-stone-500">
                  Como você gosta que a fragrância se comporte na pele:
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    { id: 'suave', label: '🌿 Leve & Elegante', desc: 'Projeção suave, ideal para quem prefere algo discreto' },
                    { id: 'moderada', label: '✨ Equilibrada & Sofisticada', desc: 'Presença notada a 1 metro com elegância sem exageros' },
                    { id: 'marcante', label: '🔥 Marcante & Potente (Rastro Inesquecível)', desc: 'Fixação de mais de 12 horas e projeção envolvente' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setIntensity(opt.id);
                        calculateMatch(occasion, scentProfile);
                      }}
                      className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-amber-800 hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-stone-900 text-sm group-hover:text-amber-950">
                          {opt.label}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Matched Result */}
        {step === 4 && matchedPerfume && (
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>98% de Compatibilidade Olfativa!</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Sua Fragrância Assinatura é:
            </h3>

            <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden text-left p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={matchedPerfume.image}
                alt={matchedPerfume.name}
                className="w-28 h-36 object-cover rounded-xl bg-stone-200 shrink-0"
              />
              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                  {matchedPerfume.category} · {matchedPerfume.family}
                </span>
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  {matchedPerfume.name}
                </h4>
                <p className="text-xs text-stone-500">{matchedPerfume.subtitle}</p>
                <p className="text-xs text-stone-600 line-clamp-2 pt-1">
                  {matchedPerfume.description}
                </p>
                <div className="text-sm font-bold text-stone-900 pt-1 font-serif">
                  A partir de {formatMetical(matchedPerfume.price50ml)} (50ml)
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(matchedPerfume, '50ml');
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                  added ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado ao Carrinho!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar Frasco 50ml</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewDetails(matchedPerfume);
                }}
                className="w-full sm:w-auto py-3 px-4 border border-stone-300 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Notas Completas</span>
              </button>
            </div>

            <button
              onClick={resetQuiz}
              className="text-xs text-stone-400 hover:text-stone-700 inline-flex items-center gap-1 pt-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer o teste</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
