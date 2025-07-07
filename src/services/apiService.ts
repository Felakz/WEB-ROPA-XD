import axios from 'axios';
import type { CartItem } from '../contexts/CartContext';

const API_BASE_URL = 'http://localhost:8080';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    console.log('Productos obtenidos:', response.data); // Log para depurar
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateCart = async (cartItems: CartItem[]) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, { items: cartItems });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};