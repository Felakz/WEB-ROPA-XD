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
      <section className="hero-section text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Bienvenido a <span className="text-light">StyleShop</span>
              </h1>
              <p className="lead mb-4">
                Descubre las últimas tendencias en moda. Calidad, estilo y comodidad en cada prenda.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/productos" className="text-decoration-none">
                  <Button
                    variant="light"
                    size="lg"
                    className="text-primary fw-semibold w-100"
                  >
                    Ver Productos <FiArrowRight className="ms-2" />
                  </Button>
                </Link>
                <Button variant="outline-light" size="lg">
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
                ¿Por qué elegir StyleShop?
              </h2>
              <p className="lead text-muted">
                Ofrecemos la mejor experiencia de compra en línea
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 text-center h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FiTruck size={48} className="text-primary" />
                  </div>
                  <Card.Title className="h5 fw-bold">Envío Gratis</Card.Title>
                  <Card.Text className="text-muted">
                    Envío gratuito en compras mayores a $50. Rápido y seguro.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 text-center h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FiShield size={48} className="text-primary" />
                  </div>
                  <Card.Title className="h5 fw-bold">Compra Segura</Card.Title>
                  <Card.Text className="text-muted">
                    Pagos seguros con encriptación SSL. Tu información protegida.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 text-center h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FiRefreshCw size={48} className="text-primary" />
                  </div>
                  <Card.Title className="h5 fw-bold">Devolución Fácil</Card.Title>
                  <Card.Text className="text-muted">
                    30 días para devolver tu compra sin preguntas.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="h1 fw-bold text-dark mb-3">
                Productos Destacados
              </h2>
              <p className="lead text-muted">
                Descubre nuestras prendas más populares
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} sm={6} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-5">
            <Col>
              <Link to="/productos" className="text-decoration-none">
                <Button variant="primary" size="lg">
                  Ver Todos los Productos
                  <FiArrowRight className="ms-2" />
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="h1 fw-bold mb-3">
                ¿Listo para renovar tu estilo?
              </h2>
              <p className="lead mb-4">
                Únete a miles de clientes satisfechos y descubre la moda que te define.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/productos" className="text-decoration-none">
                  <Button variant="light" size="lg" className="text-primary fw-semibold">
                    Explorar Colección
                  </Button>
                </Link>
                <Button variant="outline-light" size="lg">
                  Suscribirse al Newsletter
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
