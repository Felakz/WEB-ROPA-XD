package com.kingcarty.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.kingcarty.backend.model.Product;
import com.kingcarty.backend.repository.ProductRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
      
            Product product1 = new Product("Camiseta Casual", "Camiseta de algodón 100% con diseño moderno", "Camisetas", 29.99, "https://via.placeholder.com/300x400");
            product1.setSizes("S,M,L,XL");
            product1.setColors("Negro,Blanco,Azul");
            product1.setRating(4.5);
            product1.setReviews(127);

            Product product2 = new Product("Jeans Slim Fit", "Jeans ajustados de mezclilla premium", "Pantalones", 59.99, "https://via.placeholder.com/300x400");
            product2.setSizes("28,30,32,34,36");
            product2.setColors("Azul Oscuro,Negro");
            product2.setRating(4.3);
            product2.setReviews(89);

            Product product3 = new Product("Chaqueta de Cuero", "Chaqueta de cuero sintético para estilo urbano", "Chaquetas", 129.99, "https://via.placeholder.com/300x400");
            product3.setSizes("S,M,L,XL");
            product3.setColors("Negro,Marrón");
            product3.setRating(4.7);
            product3.setReviews(54);

            Product product4 = new Product("Vestido Elegante", "Vestido largo perfecto para ocasiones especiales", "Vestidos", 89.99, "https://via.placeholder.com/300x400");
            product4.setSizes("XS,S,M,L");
            product4.setColors("Negro,Rojo,Azul Marino");
            product4.setRating(4.6);
            product4.setReviews(76);

            productRepository.save(product1);
            productRepository.save(product2);
            productRepository.save(product3);
            productRepository.save(product4);

            System.out.println("Datos de prueba creados: " + productRepository.count() + " productos");
        }
    }
}
