import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap';
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

const NavigationBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setExpanded(false);
  };

  return (
    <Navbar bg="dark" expand="lg" className="shadow-sm border-bottom sticky-top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div 
            className="d-flex align-items-center justify-content-center me-2 bg-white text-dark rounded"
            style={{ width: '32px', height: '32px' }}
          >
            <span className="fw-bold">K</span>
          </div>
          <span className="fw-bold text-light">KingCarty</span>
        </Navbar.Brand>

        <div className="d-flex align-items-center d-lg-none">
          {/* Mobile Cart Icon */}
          <Link to="/carrito" className="position-relative me-3 text-decoration-none">
            <FiShoppingBag size={20} className="text-light" />
            {cartState.itemCount > 0 && (
              <Badge 
                bg="primary" 
                className="cart-badge"
              >
                {cartState.itemCount}
              </Badge>
            )}
          </Link>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <FiX /> : <FiMenu />}
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="basic-navbar-nav" in={expanded}>
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              onClick={() => setExpanded(false)}
              className="fw-medium"
            >
              Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/productos" 
              onClick={() => setExpanded(false)}
              className="fw-medium"
            >
              Productos
            </Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center">
            {/* Desktop Icons */}
            <div className="d-none d-lg-flex align-items-center me-3">
              <Button variant="link" className="text-light p-2">
                <FiSearch size={18} />
              </Button>
              <Button variant="link" className="text-light p-2">
                <FiHeart size={18} />
              </Button>
              <Link to="/carrito" className="position-relative text-decoration-none">
                <Button variant="link" className="text-light p-2">
                  <FiShoppingBag size={18} />
                  {cartState.itemCount > 0 && (
                    <Badge 
                      bg="primary" 
                      className="cart-badge"
                    >
                      {cartState.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Authentication */}
            {authState.isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" size="sm">
                  <FiUser className="me-1" />
                  {authState.user?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    <small className="text-muted">Hola, {authState.user?.name}</small>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  {authState.isAdmin && (
                    <>
                      <Dropdown.Item as={Link} to="/admin">
                        Panel Admin
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="text-decoration-none">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setExpanded(false)}
                >
                  <FiUser className="me-1" />
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
