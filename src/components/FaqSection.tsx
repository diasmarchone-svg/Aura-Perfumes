import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Os perfumes são 100% originais?',
      a: 'Sim, absolutamente todos os nossos frascos são originais, lacrados de fábrica, com lote verificável, garantia de procedência das maiores casas de essências do mundo e emissão de nota fiscal eletrônica.',
    },
    {
      q: 'Qual a diferença entre Eau de Parfum (EDP) e Eau de Toilette (EDT)?',
      a: 'A principal diferença é a concentração de óleos essenciais puros. Eau de Parfum possui entre 15% e 20% de concentração, fixando por 10 a 16 horas. O Eau de Toilette possui em torno de 8% a 12%, sendo mais fresco e ideal para reaplicar em climas quentes.',
    },
    {
      q: 'Como funciona o Frete Grátis e prazo de entrega?',
      a: 'Oferecemos Frete Grátis para todo o Brasil em compras acima de R$ 250,00. Nossos pedidos são despachados em até 24 horas úteis via transportadora expressa ou Sedex, com código de rastreio enviado imediatamente para seu e-mail e WhatsApp.',
    },
    {
      q: 'Como fazer o perfume durar ainda mais na minha pele?',
      a: 'Borrife nas áreas de maior pulsação sanguínea (pulsos, nuca, atrás das orelhas e dobra dos cotovelos). Hidratar a pele antes com um hidratante neutro retém os óleos essenciais por muito mais tempo. Evite esfregar os pulsos após a aplicação para não quebrar as moléculas de topo.',
    },
    {
      q: 'Posso trocar se a fragrância não combinar comigo?',
      a: 'Sim! Com nosso programa de Satisfação Garantida, você pode solicitar a troca ou devolução em até 7 dias corridos após o recebimento. Para sua conveniência, enviamos 2 amostras grátis para você testar antes mesmo de deslacrar o frasco principal.',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-amber-900 font-semibold mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-stone-900">
            Perguntas Frequentes
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Tudo o que você precisa saber antes de adquirir sua fragrância de assinatura.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium text-stone-900 hover:text-amber-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-800' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
