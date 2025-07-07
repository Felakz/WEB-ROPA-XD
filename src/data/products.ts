export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chaqueta Denim Clásica",
    price: 89.99,
    originalPrice: 119.99,
    description: "Chaqueta de denim de alta calidad con diseño clásico. Perfecta para cualquier ocasión casual.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&object-fit=cover",
    category: "Chaquetas",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Azul", "Negro", "Gris"],
    inStock: true,
    rating: 4.5,
    reviews: 124
  },
  {
    id: 2,
    name: "Vestido Floral Primavera",
    price: 65.99,
    description: "Hermoso vestido con estampado floral, ideal para la primavera y verano.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&object-fit=cover",
    category: "Vestidos",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rosa", "Azul", "Blanco"],
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: "Pantalón Chino Casual",
    price: 45.99,
    originalPrice: 59.99,
    description: "Pantalón chino cómodo y versátil para uso diario.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&object-fit=cover",
    category: "Pantalones",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Beige", "Negro", "Azul marino"],
    inStock: true,
    rating: 4.3,
    reviews: 156
  },
  {
    id: 4,
    name: "Blusa Elegante",
    price: 39.99,
    description: "Blusa elegante perfecta para el trabajo o eventos especiales.",
    image: "https://images.unsplash.com/photo-1564257577-b5e5f1c1a9c2?w=400&h=500&object-fit=cover",
    category: "Blusas",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Rosa"],
    inStock: true,
    rating: 4.6,
    reviews: 67
  },
  {
    id: 5,
    name: "Sudadera Hoodie",
    price: 55.99,
    description: "Sudadera con capucha ultra cómoda para días relajados.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&object-fit=cover",
    category: "Sudaderas",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gris", "Negro", "Azul"],
    inStock: true,
    rating: 4.4,
    reviews: 203
  },
  {
    id: 6,
    name: "Falda Midi",
    price: 42.99,
    description: "Falda midi versátil que combina con cualquier look.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d04?w=400&h=500&object-fit=cover",
    category: "Faldas",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Beige", "Azul marino"],
    inStock: false,
    rating: 4.7,
    reviews: 92
  },
  {
    id: 7,
    name: "Camisa Formal",
    price: 49.99,
    originalPrice: 69.99,
    description: "Camisa formal de alta calidad para ocasiones especiales.",
    image: "https://images.unsplash.com/photo-1603252109612-ffd69d50c9f6?w=400&h=500&object-fit=cover",
    category: "Camisas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Azul", "Negro"],
    inStock: true,
    rating: 4.5,
    reviews: 134
  },
  {
    id: 8,
    name: "Jeans Skinny",
    price: 67.99,
    description: "Jeans skinny de corte moderno y cómodo.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&object-fit=cover",
    category: "Pantalones",
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Azul", "Negro", "Gris"],
    inStock: true,
    rating: 4.2,
    reviews: 178
  }
];

export const categories = [
  "Todos",
  "Chaquetas",
  "Vestidos", 
  "Pantalones",
  "Blusas",
  "Sudaderas",
  "Faldas",
  "Camisas"
];
