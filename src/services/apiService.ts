import axios from 'axios';
import type { CartItem } from '../contexts/CartContext';

const API_BASE_URL = 'http://localhost:8080';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products`);
    console.log('Datos crudos del backend:', response.data);
    
    // Verificar que response.data sea un array
    if (!Array.isArray(response.data)) {
      console.error('Los datos del backend no son un array:', response.data);
      return [];
    }
    
    // Mapear los datos del backend al formato que espera el frontend
    const mappedProducts = response.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      rating: product.rating || 4.5,
      image: product.imageUrl || 'https://via.placeholder.com/300x400',
      sizes: product.sizes ? product.sizes.split(',') : ['M'],
      colors: product.colors ? product.colors.split(',') : ['Negro'],
      inStock: true,
      reviews: product.reviews || 0
    }));
    
    console.log('Productos mapeados:', mappedProducts);
    return mappedProducts;
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