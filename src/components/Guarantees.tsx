import React from 'react';
import { Award, Clock, Sparkles, RefreshCw } from 'lucide-react';

export const Guarantees: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: '100% Originais & Selados',
      desc: 'Perfumes com garantia de procedência oficial das maiores casas de essências do mundo.',
    },
    {
      icon: Clock,
      title: 'Fixação Comprovada 12h+',
      desc: 'Formulação rica em óleos nobres com excelente desempenho no clima de Moçambique.',
    },
    {
      icon: Sparkles,
      title: '2 Amostras Grátis',
      desc: 'Toda encomenda acompanha 2 flaconetes de 2ml para experimentar novidades.',
    },
    {
      icon: RefreshCw,
      title: 'Entregas em Moçambique',
      desc: 'Entregas rápidas em Maputo e Matola em até 24h e envios seguros para todas as províncias.',
    },
  ];

  return (
    <section className="py-14 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-900 font-semibold block">
            Compromisso de Excelência
          </span>
          <h2 className="font-serif text-3xl font-semibold text-stone-900 mt-1">
            Por que escolher a Aura Parfums?
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Acreditamos que perfume não é apenas cosmético, é uma extensão da sua identidade e confiança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-700/40 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-800 mb-4 group-hover:bg-amber-100 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-1.5">{p.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
