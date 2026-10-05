export interface Perfume {
  id: string;
  name: string;
  subtitle: string;
  category: 'feminino' | 'masculino' | 'unissex' | 'nicho';
  concentration: 'Eau de Parfum' | 'Extrait de Parfum' | 'Eau de Toilette';
  family: string; // e.g. "Oriental Ambarado", "Amadeirado Especiado"
  price50ml: number;
  price100ml: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string; // e.g. "10 a 14 horas"
  projection: string; // e.g. "Marcante (2m)"
  occasion: string; // e.g. "Noite, Eventos, Clima Ameno"
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  perfume: Perfume;
  size: '50ml' | '100ml';
  price: number;
  quantity: number;
}
