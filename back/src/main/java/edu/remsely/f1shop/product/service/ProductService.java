package edu.remsely.f1shop.product.service;

import edu.remsely.f1shop.product.entity.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);
    Product updateProduct(Product product, long productId);
    Product getProduct(long productId);
    List<Product> getAllProducts();
}
