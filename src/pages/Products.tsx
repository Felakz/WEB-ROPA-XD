import React, { useState, useMemo, useEffect } from 'react';
import { FiFilter, FiGrid, FiList, FiSearch } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/apiService';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  reviews: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        if (!Array.isArray(data)) {
          throw new Error('La respuesta del backend no es un arreglo de productos.');
        }
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        alert('Hubo un problema al cargar los productos. Por favor, verifica el backend.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

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
  }, [products, selectedCategory, sortBy, priceRange, searchTerm]);

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
                    {['Todos', ...new Set(products.map((p) => p.category))].map((category) => (
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
              {isLoading ? (
                <p>Cargando productos...</p>
              ) : (
                filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-lg-4">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
