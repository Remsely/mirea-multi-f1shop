package edu.remsely.f1shop.product.repository;

import edu.remsely.f1shop.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
