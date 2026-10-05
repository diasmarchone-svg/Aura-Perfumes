import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Os perfumes são 100% originais?',
      a: 'Sim, absolutamente todos os nossos frascos são originais, selados de fábrica, com lote verificável e garantia de autenticidade das maiores casas perfumistas internacionais.',
    },
    {
      q: 'Quais as formas de pagamento disponíveis em Moçambique?',
      a: 'Aceitamos M-Pesa (Vodacom), e-Mola (Movitel), Transferência Bancária (Millennium BIM / BCI) e Cartões Visa/Mastercard. Pode também concluir e enviar o comprovativo diretamente pelo nosso WhatsApp.',
    },
    {
      q: 'Como funcionam os prazos de entrega e a Entrega Grátis?',
      a: 'Oferecemos Entrega Grátis em compras a partir de 3.500 MT. Para Maputo Cidade e Matola, as entregas são efetuadas em até 24 horas por estafeta próprio. Para as restantes províncias (Beira, Nampula, Tete, Pemba, etc.), os envios demoram entre 48h a 72h.',
    },
    {
      q: 'Qual a diferença entre Eau de Parfum (EDP) e Eau de Toilette (EDT)?',
      a: 'A principal diferença é a concentração de essência pura. O Eau de Parfum tem entre 15% e 20% de concentração, garantindo fixação prolongada de 10h a 16h no clima tropical de Moçambique. O Eau de Toilette possui cerca de 8% a 12%, sendo mais fresco.',
    },
    {
      q: 'Posso encomendar e receber no meu local de trabalho ou residência?',
      a: 'Sim! Entregamos em residências, condomínios e escritórios em Maputo, Matola e cidades provinciais. Nosso estafeta entra em contacto telefónico antes da entrega.',
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
