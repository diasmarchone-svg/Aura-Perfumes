import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Clock, Gift } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onQuizClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuizClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F1EB] to-[#FAF8F5] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-xs tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Alta Perfumaria & Matérias-Primas Nobres</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.15]">
              Fragrâncias que traduzem a sua{' '}
              <span className="italic font-normal text-amber-900">essência mais pura</span>.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Descubra perfumes importados de alta fixação e essências de nicho criadas para despertar
              elogios e eternizar momentos. Simplicidade, sofisticação e autenticidade em cada borrifada.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white rounded-full font-medium text-sm hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explorar Coleção</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onQuizClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-stone-300 text-stone-800 rounded-full font-medium text-sm hover:border-amber-700 hover:text-amber-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Quiz Olfativo (30 seg)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">100% Originais</h4>
                  <p className="text-[11px] text-stone-500">Garantia em Moçambique</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Fixação 12h+</h4>
                  <p className="text-[11px] text-stone-500">Eau de Parfum</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Gift className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">2 Amostras</h4>
                  <p className="text-[11px] text-stone-500">Oferta na encomenda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85"
                  alt="Frasco de Perfume de Luxo Aura Parfums"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] tracking-widest uppercase font-mono text-amber-300">
                    Edição Limitada
                  </span>
                  <h3 className="font-serif text-2xl font-normal mt-1">Fleur d’Oranger & Vanille</h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    Notas de Flor de Laranjeira, Baunilha de Bourbon e Fava Tonka.
                  </p>
                </div>
              </div>

              {/* Little Floating Tag */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Destaque da Coleção</span>
                <span className="text-xs font-bold text-amber-900">Extrato Puro · Alta Densidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
