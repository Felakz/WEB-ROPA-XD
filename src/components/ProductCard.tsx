import React, { useState } from 'react';
import { Card, Button, Badge, Row, Col, Modal, Form } from 'react-bootstrap';
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [isWishlist, setIsWishlist] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setShowModal(true);
      return;
    }
    addItem(product, selectedSize, selectedColor);
  };

  const handleQuickAdd = () => {
    addItem(product, product.sizes[0], product.colors[0]);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`${
          index < Math.floor(rating) ? 'text-warning' : 'text-muted'
        }`}
        style={{ fontSize: '14px' }}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <>
      <Card className="h-100 card-hover border-0 shadow-lg bg-light text-dark product-card hover-scale">
        <div className="position-relative overflow-hidden">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="product-image rounded-top"
          />
          
          {/* Badges */}
          <div className="position-absolute top-0 start-0 p-2">
            {!product.inStock && (
              <Badge bg="danger" className="me-1">Agotado</Badge>
            )}
            {product.originalPrice && (
              <Badge bg="success">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* Hover Actions */}
          <div className="position-absolute top-0 end-0 p-2">
            <Button
              variant={isWishlist ? "danger" : "light"}
              size="sm"
              className="mb-1 d-block rounded-circle"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <FiHeart fill={isWishlist ? 'currentColor' : 'none'} />
            </Button>
            <Button
              variant="light"
              size="sm"
              className="d-block rounded-circle"
              onClick={() => setShowModal(true)}
            >
              <FiEye />
            </Button>
          </div>
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            <Badge bg="primary" className="mb-2">
              {product.category}
            </Badge>
            <Card.Title className="h6 fw-bold">
              {product.name}
            </Card.Title>
          </div>

          <div className="mb-2">
            <div className="d-flex align-items-center mb-1">
              <div className="me-2">
                {renderStars(product.rating)}
              </div>
              <small className="text-muted">
                ({product.reviews} reseñas)
              </small>
            </div>
            <div className="d-flex align-items-center">
              <span className="h5 fw-bold text-success mb-0 me-2">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <small className="text-muted text-decoration-line-through">
                  ${product.originalPrice.toFixed(2)}
                </small>
              )}
            </div>
          </div>

          <Card.Text className="text-muted small flex-grow-1">
            {product.description}
          </Card.Text>

          <div className="mt-auto">
            <Row className="g-2">
              <Col>
                <Button
                  variant="success"
                  size="sm"
                  className="w-100"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <FiShoppingCart className="me-1" />
                  {product.inStock ? 'Agregar' : 'Agotado'}
                </Button>
              </Col>
              {product.inStock && (
                <Col xs="auto">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={handleQuickAdd}
                    title="Compra rápida"
                  >
                    <FiShoppingCart />
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        </Card.Body>
      </Card>

      {/* Modal de detalles del producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" data-bs-theme="dark">
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Row>
            <Col md={6}>
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h5 className="text-white">${product.price.toFixed(2)}</h5>
              {product.originalPrice && (
                <p className="text-light text-decoration-line-through">
                  Precio original: ${product.originalPrice.toFixed(2)}
                </p>
              )}
              
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  {renderStars(product.rating)}
                  <span className="ms-2 text-light">
                    {product.rating}/5 ({product.reviews} reseñas)
                  </span>
                </div>
              </div>

              <p className="text-light">{product.description}</p>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Talla</Form.Label>
                <Form.Select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-dark text-white border-secondary"
                >
                  <option value="">Selecciona una talla</option>
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Color</Form.Label>
                <Form.Select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-dark text-white border-secondary"
                >
                  <option value="">Selecciona un color</option>
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="light"
            onClick={() => {
              if (selectedSize && selectedColor) {
                addItem(product, selectedSize, selectedColor);
                setShowModal(false);
              }
            }}
            disabled={!selectedSize || !selectedColor || !product.inStock}
            className="text-dark"
          >
            <FiShoppingCart className="me-1" />
            Agregar al Carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;