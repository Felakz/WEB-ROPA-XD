import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-dark">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Bienvenido a <span className="text-dark">KingCarty</span>
              </h1>
              <p className="lead mb-4">
                Descubre las últimas tendencias en moda. Calidad, estilo y comodidad en cada prenda.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/productos" className="text-decoration-none">
                  <Button
                    variant="primary"
                    size="lg"
                    className="fw-semibold w-100"
                  >
                    Ver Productos <FiArrowRight className="ms-2" />
                  </Button>
                </Link>
                <Button variant="outline-dark" size="lg">
                  Conocer Más
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="h1 fw-bold text-dark mb-3">
                ¿Por qué elegir KingCarty?
              </h2>
              <p className="lead text-muted">
                Ofrecemos la mejor experiencia de compra con productos de calidad y servicio excepcional.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '64px', height: '64px' }}>
                <FiTruck size={32} className="text-primary" />
              </div>
              <h3 className="h5 fw-semibold mb-2">Envío Gratis</h3>
              <p className="text-muted">
                Envío gratuito en compras superiores a $50. Recibe tus productos en 2-3 días hábiles.
              </p>
            </Col>
            
            <Col md={4} className="text-center">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '64px', height: '64px' }}>
                <FiShield size={32} className="text-primary" />
              </div>
              <h3 className="h5 fw-semibold mb-2">Garantía Total</h3>
              <p className="text-muted">
                Garantía de satisfacción del 100%. Si no estás feliz, te devolvemos tu dinero.
              </p>
            </Col>
            
            <Col md={4} className="text-center">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '64px', height: '64px' }}>
                <FiRefreshCw size={32} className="text-primary" />
              </div>
              <h3 className="h5 fw-semibold mb-2">Fácil Devolución</h3>
              <p className="text-muted">
                Devoluciones fáciles y rápidas. Tienes 30 días para cambiar de opinión.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="h1 fw-bold text-dark mb-3">
                Productos Destacados
              </h2>
              <p className="lead text-muted">
                Descubre nuestras piezas más populares de la temporada
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 mb-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} sm={6} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          
          <Row>
            <Col className="text-center">
              <Link to="/productos" className="text-decoration-none">
                <Button variant="primary" size="lg">
                  Ver Todos los Productos <FiArrowRight className="ms-2" />
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-white text-dark">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h2 className="h1 fw-bold mb-3">
                Mantente al día con las últimas tendencias
              </h2>
              <p className="lead mb-4">
                Suscríbete a nuestro newsletter y recibe ofertas exclusivas y las novedades de moda.
              </p>
              
              <Row className="justify-content-center">
                <Col md={8}>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Tu email"
                    />
                    <Button variant="dark" type="button">
                      Suscribirse
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
