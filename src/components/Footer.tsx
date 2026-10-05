import React from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Shield, CreditCard } from 'lucide-react';

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
                Perfumaria Fina
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curadoria de perfumes importados e fragrâncias raras de nicho. Alta concentração olfativa, notas elegantes e fixação prolongada.
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
                href="https://wa.me/5511999998888"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categorias */}
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
                  Mais Vendidos
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento & Contato */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Atendimento Exclusivo
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: (11) 99999-8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contato@auraparfums.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Jardins · São Paulo - SP</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Segunda a Sexta: 09h às 19h<br />Sábados: 09h às 14h
              </div>
            </div>
          </div>

          {/* Segurança & Pagamentos */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Segurança & Pagamentos
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2 text-stone-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Ambiente Seguro com Criptografia SSL</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Aceitamos PIX com 5% de desconto extra, Cartão de Crédito em até 6x sem juros e Boleto Bancário.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-stone-300 font-mono">
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">PIX</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">VISA</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">MASTERCARD</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded">ELO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Parfums. Todos os direitos reservados. CNPJ: 45.123.890/0001-23</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">Termos de Uso</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Política de Privacidade</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Trocas & Devoluções</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
