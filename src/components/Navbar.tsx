import React from 'react';
import { ShoppingBag, Search, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const categories = [
    { id: 'todos', label: 'Todos os Perfumes' },
    { id: 'feminino', label: 'Femininos' },
    { id: 'masculino', label: 'Masculinos' },
    { id: 'unissex', label: 'Unissex' },
    { id: 'nicho', label: 'Nicho & Árabes' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-normal tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span>✨ <strong>Frete Grátis</strong> para todo o Brasil acima de R$ 250</span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline">2 Amostras de Luxo de Brinde</span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden md:inline">Até 6x sem juros no cartão</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <a href="#" className="inline-block group text-left">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-stone-900 group-hover:text-amber-800 transition-colors uppercase">
                AURA
              </span>
              <span className="block text-[10px] tracking-[0.35em] text-stone-500 -mt-1 font-sans uppercase">
                Perfumaria Fina
              </span>
            </a>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center space-x-7">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('catalogo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm tracking-wide transition-colors py-1 ${
                  selectedCategory === cat.id
                    ? 'text-amber-800 font-semibold border-b-2 border-amber-800'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Fragrance Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 hover:border-amber-300 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Descubra seu Perfume</span>
            </button>

            {/* Search Trigger */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar notas, marca..."
                    autoFocus
                    className="w-full text-xs outline-none bg-transparent text-stone-800 placeholder:text-stone-400"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-stone-400 hover:text-stone-700 text-xs ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100"
                  aria-label="Pesquisar perfumes"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-800 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-stone-900 text-amber-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-3 px-2 space-y-2 bg-[#FAF8F5]">
            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-100/70 text-amber-900 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              Quiz Olfativo: Encontre seu Perfume Ideal
            </button>
            <div className="pt-2 grid grid-cols-2 gap-1 text-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('catalogo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left px-3 py-2 rounded-md ${
                    selectedCategory === cat.id
                      ? 'bg-stone-200 text-stone-900 font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
