import React, { useState, useMemo, useEffect } from 'react';
import { FiFilter, FiGrid, FiList, FiSearch } from 'react-icons/fi';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';


const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simular carga cuando cambian los filtros
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, sortBy, priceRange, searchTerm]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      const searchMatch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [selectedCategory, sortBy, priceRange, searchTerm]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4 animate-slide-up">Nuestros Productos</h1>
          <p className="text-gray-300 mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
            Descubre nuestra colección completa de moda moderna y elegante
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md animate-slide-up" style={{animationDelay: '0.2s'}}>
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6 animate-slide-left">
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Filtros</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-gray-800 rounded-md"
                >
                  <FiFilter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 transition-all duration-300 ${showFilters ? 'block opacity-100' : 'hidden lg:block lg:opacity-100'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-white mb-3">Categorías</h4>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 transform hover:scale-105 ${
                          selectedCategory === category
                            ? 'bg-white text-black font-medium shadow-md'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-white mb-3">Precio</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span className="bg-gray-800 px-2 py-1 rounded">${priceRange.min}</span>
                      <span className="bg-gray-800 px-2 py-1 rounded">${priceRange.max}</span>
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setPriceRange({ min: 0, max: 200 });
                    setSortBy('name');
                    setSearchTerm('');
                  }}
                  className="w-full text-sm text-white hover:text-gray-300 font-medium border border-gray-600 rounded-md py-2 transition-all duration-200 hover:bg-gray-800 hover:scale-105"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 animate-slide-right">
            {/* Controls */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300 animate-pulse">
                    {filteredAndSortedProducts.length} productos encontrados
                  </span>
                  {isLoading && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-600 bg-gray-800 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 hover:bg-gray-700"
                  >
                    <option value="name">Nombre (A-Z)</option>
                    <option value="price-low">Precio (Menor a Mayor)</option>
                    <option value="price-high">Precio (Mayor a Menor)</option>
                    <option value="rating">Mejor Calificación</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <FiGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <FiList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={`grid gap-6 transition-all duration-500 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`animate-fade-in-up ${viewMode === 'list' ? 'max-w-none' : ''}`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: isLoading ? 0.5 : 1,
                      transform: isLoading ? 'scale(0.95)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-gray-400 mb-4 animate-bounce">
                  <FiFilter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2 animate-slide-up">
                  No se encontraron productos
                </h3>
                <p className="text-gray-300 mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  Intenta ajustar los filtros o términos de búsqueda para ver más productos
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setPriceRange({ min: 0, max: 200 });
                    setSearchTerm('');
                  }}
                  className="text-white hover:text-gray-300 font-medium border border-gray-600 rounded-md px-6 py-3 transition-all duration-200 hover:bg-gray-800 hover:scale-105 animate-slide-up"
                  style={{animationDelay: '0.2s'}}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
