import React from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-white block uppercase">
                AURA
              </span>
              <span className="block text-[10px] tracking-[0.35em] text-stone-400 uppercase -mt-0.5">
                Perfumaria Fina · Moçambique
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curadoria de perfumes importados e fragrâncias raras de nicho em Moçambique. Alta concentração olfativa, notas elegantes e fixação duradoura.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:border-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/258845557890"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coleções */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Coleções
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Perfumes Femininos
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Perfumes Masculinos
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Fragrâncias Unissex
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Perfumaria Árabe & Nicho
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Mais Vendidos em Maputo
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento & Contacto em Moçambique */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Atendimento em Moçambique
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +258 84 555 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contacto@auraparfums.co.mz</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Av. Julius Nyerere, Polana · Maputo</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Segunda a Sexta: 08h30 às 18h30<br />Sábados: 09h00 às 15h00
              </div>
            </div>
          </div>

          {/* Segurança & Pagamentos Locais */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Pagamento em Moçambique
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2 text-stone-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Transações Seguras e Confirmadas</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Pague facilmente com M-Pesa, e-Mola, Transferência Millennium BIM / BCI ou na entrega (Maputo).
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs text-stone-300 font-mono">
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-red-400 font-semibold">M-PESA</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-amber-400 font-semibold">e-Mola</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">Millennium BIM</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">BCI</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">VISA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Parfums Moçambique Lda. NUIT: 400.123.456</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">Termos e Condições</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Política de Privacidade</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Entregas em Moçambique</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
