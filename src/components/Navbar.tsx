import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingBag, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiHeart,
  FiSearch 
} from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="bg-primary rounded me-2 d-flex align-items-center justify-content-center" 
               style={{ width: '32px', height: '32px' }}>
            <span className="text-white fw-bold">S</span>
          </div>
          <span className="fw-bold text-dark">StyleShop</span>
        </Link>

        {/* Mobile toggle and cart */}
        <div className="d-flex align-items-center d-lg-none">
          <Link to="/carrito" className="btn btn-link position-relative me-2 p-2">
            <FiShoppingBag size={20} />
            {cartState.itemCount > 0 && (
              <span className="badge-count">
                {cartState.itemCount}
              </span>
            )}
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                to="/" 
                className="nav-link fw-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/productos" 
                className="nav-link fw-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Search and Wishlist (Desktop only) */}
            <div className="d-none d-lg-flex align-items-center me-3">
              <button className="btn btn-link p-2 me-1">
                <FiSearch size={20} />
              </button>
              <button className="btn btn-link p-2 me-1">
                <FiHeart size={20} />
              </button>
            </div>

            {/* Cart */}
            <Link to="/carrito" className="btn btn-link position-relative p-2 me-3 d-none d-lg-block">
              <FiShoppingBag size={20} />
              {cartState.itemCount > 0 && (
                <span className="badge-count">
                  {cartState.itemCount}
                </span>
              )}
            </Link>
            
            {/* Auth Section */}
            {authState.isAuthenticated ? (
              <div className="d-flex align-items-center">
                <span className="text-muted me-2 d-none d-md-inline">
                  Hola, {authState.user?.name}
                </span>
                {authState.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-sm btn-outline-danger"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-outline-primary d-flex align-items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser size={16} className="me-1" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu content */}
          <div className="d-lg-none mt-3 pt-3 border-top">
            {authState.isAuthenticated ? (
              <div>
                <div className="text-muted mb-2">
                  Hola, {authState.user?.name}
                </div>
                {authState.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="btn btn-outline-primary btn-sm me-2 mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Panel Admin
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-outline-danger btn-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-outline-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
