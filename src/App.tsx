import React, { useState, useMemo } from 'react';
import { PERFUMES } from './data/perfumes';
import { Perfume, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';
import { Guarantees } from './components/Guarantees';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPerfumeForModal, setSelectedPerfumeForModal] = useState<Perfume | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutShipping, setCheckoutShipping] = useState(0);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'menor-preco' | 'maior-preco' | 'avaliacao'>('popular');

  // Cart total item count
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Add to cart handler
  const handleAddToCart = (perfume: Perfume, size: '50ml' | '100ml', quantity = 1) => {
    const price = size === '50ml' ? perfume.price50ml : perfume.price100ml;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.perfume.id === perfume.id && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { perfume, size, price, quantity }];
      }
    });
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (perfumeId: string, size: '50ml' | '100ml', newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(perfumeId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.perfume.id === perfumeId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (perfumeId: string, size: '50ml' | '100ml') => {
    setCart((prev) =>
      prev.filter((item) => !(item.perfume.id === perfumeId && item.size === size))
    );
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Start checkout flow
  const handleStartCheckout = (discount: number, shipping: number) => {
    setCheckoutDiscount(discount);
    setCheckoutShipping(shipping);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Scroll to catalog section
  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort perfumes
  const filteredPerfumes = useMemo(() => {
    return PERFUMES.filter((perfume) => {
      // Category filter
      if (selectedCategory !== 'todos' && perfume.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inName = perfume.name.toLowerCase().includes(query);
        const inSubtitle = perfume.subtitle.toLowerCase().includes(query);
        const inDesc = perfume.description.toLowerCase().includes(query);
        const inFamily = perfume.family.toLowerCase().includes(query);
        const inNotes = [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes].some(
          (note) => note.toLowerCase().includes(query)
        );

        if (!inName && !inSubtitle && !inDesc && !inFamily && !inNotes) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'menor-preco') return a.price50ml - b.price50ml;
      if (sortBy === 'maior-preco') return b.price50ml - a.price50ml;
      if (sortBy === 'avaliacao') return b.rating - a.rating;
      // Default: popular
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = [
    { id: 'todos', label: 'Todos os Perfumes' },
    { id: 'feminino', label: 'Femininos' },
    { id: 'masculino', label: 'Masculinos' },
    { id: 'unissex', label: 'Unissex' },
    { id: 'nicho', label: 'Nicho & Árabes' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Navigation */}
      <Navbar
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={handleScrollToCatalog}
        onQuizClick={() => setIsQuizOpen(true)}
      />

      {/* Guarantees / Trust Pillars */}
      <Guarantees />

      {/* Main Catalog Section */}
      <main id="catalogo" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-amber-900 font-semibold block">
              Catálogo Oficial
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
              Fragrâncias Exclusivas
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl">
              Selecione o frasco e o tamanho desejado (50ml ou 100ml) para entrega expressa em todo o país.
            </p>
          </div>

          {/* Quick Quiz Callout Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Não sabe qual escolher? Faça o Quiz</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Dropdown */}
          <div className="flex items-center gap-3">
            {/* Search Input on catalog */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar nota ou nome..."
                className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-700 outline-none text-xs font-medium cursor-pointer"
              >
                <option value="popular">Mais Populares</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
                <option value="avaliacao">Melhor Avaliação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Count info */}
        {(searchQuery || selectedCategory !== 'todos') && (
          <div className="mb-6 flex items-center justify-between text-xs text-stone-500 bg-white/70 p-3 rounded-lg border border-stone-200">
            <span>
              Exibindo <strong>{filteredPerfumes.length}</strong> perfume(s) encontrado(s)
              {searchQuery && <> para "<em>{searchQuery}</em>"</>}
              {selectedCategory !== 'todos' && <> na categoria <strong>{selectedCategory}</strong></>}
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="text-amber-800 hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Limpar filtros
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPerfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                perfume={perfume}
                onAddToCart={(p, s) => handleAddToCart(p, s, 1)}
                onViewDetails={(p) => setSelectedPerfumeForModal(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Nenhuma fragrância encontrada
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Não encontramos resultados para sua busca com o termo "{searchQuery}".
              Tente pesquisar por notas como "baunilha", "madeira", "cítrico" ou limpe os filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
            >
              Ver Todas as Fragrâncias
            </button>
          </div>
        )}

        {/* Discovery Banner */}
        <div className="mt-16 bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs tracking-widest uppercase font-mono text-amber-300">
              Experiência Olfativa Sob Medida
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
              Precisa de ajuda para escolher sua fragrância de assinatura?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light">
              Responda a 3 perguntas simples sobre sua personalidade e descubra o perfume que mais combina com seu estilo.
            </p>
          </div>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="shrink-0 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-full text-xs transition-colors flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Fazer o Teste Rápido</span>
          </button>
        </div>
      </main>

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal
        perfume={selectedPerfumeForModal}
        onClose={() => setSelectedPerfumeForModal(null)}
        onAddToCart={(perfume, size, quantity) => handleAddToCart(perfume, size, quantity)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleStartCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discount={checkoutDiscount}
        shipping={checkoutShipping}
        onSuccess={() => handleClearCart()}
      />

      <FragranceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        perfumes={PERFUMES}
        onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
        onViewDetails={(p) => setSelectedPerfumeForModal(p)}
      />
    </div>
  );
}
