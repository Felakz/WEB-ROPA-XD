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
        <div className="mb-4">
          <h1 className="text-center fw-bold mb-3">Nuestros Productos</h1>
          <div className="input-group mb-4">
            <span className="input-group-text bg-light border-secondary">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control border-secondary"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-12 col-md-3 mb-4">
            <div className="card border-secondary">
              <div className="card-header bg-light fw-bold">Filtros</div>
              <div className="card-body">
                {/* Categories */}
                <div className="mb-3">
                  <h5 className="fw-bold">Categorías</h5>
                  <div className="btn-group-vertical w-100">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`btn btn-outline-secondary ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-3">
                  <h5 className="fw-bold">Precio</h5>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="200"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  />
                  <div className="d-flex justify-content-between">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setPriceRange({ min: 0, max: 200 });
                    setSortBy('name');
                    setSearchTerm('');
                  }}
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>{filteredAndSortedProducts.length} productos encontrados</span>
              <div className="btn-group">
                <button
                  className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button
                  className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="row g-4">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-lg-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
