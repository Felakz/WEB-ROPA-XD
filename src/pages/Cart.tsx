import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const { items: cartItems } = state;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 'Gratis' : 5.99;
  const total = subtotal + (shipping === 'Gratis' ? 0 : shipping);

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          <h2>Carrito de Compras</h2>
          {cartItems.map((item) => (
            <Card className="mb-3" key={item.id}>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img src={item.product.image} alt={item.product.name} className="img-fluid rounded-start" />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{item.product.name}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">{item.product.category}</small>
                      <br />
                      Talla: {item.selectedSize} | Color: {item.selectedColor}
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <input
                        type="number"
                        value={item.quantity}
                        className="form-control me-2"
                        style={{ width: '80px' }}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      />
                      <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                        Eliminar
                      </Button>
                    </div>
                    <Card.Text className="mt-2">${item.product.price.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <h2>Resumen del Pedido</h2>
          <Card>
            <Card.Body>
              <Card.Text>Subtotal: ${subtotal.toFixed(2)}</Card.Text>
              <Card.Text>Envío: {shipping}</Card.Text>
              <Card.Text>Total: ${total.toFixed(2)}</Card.Text>
              <Button variant="primary" className="w-100 mb-2">
                Proceder al Pago
              </Button>
              <Button variant="secondary" className="w-100">
                Continuar Comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
