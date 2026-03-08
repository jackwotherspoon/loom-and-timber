import { ShoppingBag, Menu, ArrowRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Koto Lounge Chair', price: '$899', image: '/images/chair.png', category: 'Seating' },
  { id: 2, name: 'Odin Dining Table', price: '$1,299', image: '/images/table.png', category: 'Tables' },
  { id: 3, name: 'Lyla Bouclé Sofa', price: '$2,499', image: '/images/sofa.png', category: 'Seating' },
  { id: 4, name: 'Ash Coffee Table', price: '$549', image: '/images/coffeetable.png', category: 'Tables' },
];

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <button className="p-2 -ml-2 hover:bg-stone-100 rounded-full transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-2xl font-serif tracking-tight">Loom & Timber</div>
        <button className="p-2 -mr-2 hover:bg-stone-100 rounded-full transition-colors relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-stone-900 rounded-full"></span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-4 pb-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="uppercase tracking-widest text-xs font-semibold text-stone-500 mb-6">New Collection</span>
        <h1 className="text-6xl md:text-7xl font-serif tracking-tight leading-tight mb-8 max-w-4xl">
          Spaces that feel like <span className="italic text-stone-500">home</span>.
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mb-10 leading-relaxed">
          Discover our curated collection of mid-century modern furniture, designed to bring warmth, elegance, and intentionality to your living space.
        </p>
        <div className="flex gap-4">
          <button className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-all flex items-center gap-2">
            Shop Collection
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-8 pb-32 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif tracking-tight">Featured Pieces</h2>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-stone-200 rounded-2xl mb-6 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wide rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-stone-500 text-sm">Solid oak, premium fabrics</p>
                </div>
                <span className="font-medium">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-stone-200 py-12 text-center text-sm text-stone-500">
        &copy; 2024 Loom & Timber. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
