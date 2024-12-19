package edu.remsely.f1shop.product.service;

import edu.remsely.f1shop.product.dto.ProductDto;
import edu.remsely.f1shop.product.entity.CartEntity;
import edu.remsely.f1shop.product.entity.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);

    Product updateProduct(Product product, long productId);

    ProductDto getProduct(long productId, long userId);

    List<ProductDto> getAllProducts(long userId, List<String> categories, String searchQuery, String sortOrder);

    ProductDto addProductToWishlist(long productId, long userId);

    ProductDto removeProductFromWishlist(long productId, long userId);

    List<ProductDto> getProductsFromWishlist(long userId);

    CartEntity addProductToCart(long productId, int amount, long userId);

    void removeProductFromCart(long productId, long userId);

    List<CartEntity> getProductsFromCart(long userId);
}
