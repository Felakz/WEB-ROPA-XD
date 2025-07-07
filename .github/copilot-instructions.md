<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para StyleShop - Tienda de Ropa

Este es un proyecto de frontend para una tienda de ropa en línea construido con React, TypeScript, Vite y Tailwind CSS.

## Tecnologías y Herramientas

- **React 18** con TypeScript
- **Vite** como build tool
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **React Icons** para iconografía
- **Context API** para manejo de estado global

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx      # Navegación principal
│   └── ProductCard.tsx # Tarjeta de producto
├── contexts/           # Contextos de React
│   ├── AuthContext.tsx # Autenticación
│   └── CartContext.tsx # Carrito de compras
├── data/              # Datos estáticos
│   ├── products.ts    # Catálogo de productos
│   └── users.ts      # Usuarios de prueba
├── pages/            # Páginas principales
│   ├── Home.tsx      # Página de inicio
│   ├── Products.tsx  # Catálogo de productos
│   ├── Cart.tsx      # Carrito de compras
│   ├── Login.tsx     # Autenticación
│   └── AdminPanel.tsx # Panel administrativo
└── App.tsx           # Componente raíz con rutas
```

## Patrones y Convenciones

### Estilos
- Usar clases de Tailwind CSS preferentemente
- Componentes con diseño responsive (mobile-first)
- Paleta de colores primary (rosa/magenta) para la marca
- Espaciado consistente y sombras suaves

### Componentes
- Componentes funcionales con TypeScript
- Props con interfaces tipadas
- Uso de hooks de React (useState, useEffect, useContext)
- Componentes reutilizables y modulares

### Estado
- Context API para estado global (carrito, auth)
- useState para estado local de componentes
- Reducers para lógica compleja (carrito)

### Routing
- React Router con rutas protegidas
- Navegación programática con useNavigate
- Rutas anidadas y fallbacks

## Funcionalidades Principales

1. **Catálogo de Productos**: Filtros, búsqueda, categorías
2. **Carrito de Compras**: Agregar, modificar, eliminar productos
3. **Autenticación**: Login para usuarios y admins
4. **Panel Admin**: Gestión básica de productos y pedidos
5. **Responsive Design**: Funciona en desktop y móvil

## Datos de Prueba

- **Admin**: admin@tienda.com / admin123
- **Usuario**: usuario@example.com / user123

## Próximas Implementaciones

- Integración con backend Spring Boot
- Pasarela de pagos
- Sistema de wishlist
- Chat de soporte
- Notificaciones push

Al trabajar en este proyecto, mantén la consistencia con estos patrones y asegúrate de que todo sea responsive y accesible.
