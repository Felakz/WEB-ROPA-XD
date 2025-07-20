package com.kingcarty.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kingcarty.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}