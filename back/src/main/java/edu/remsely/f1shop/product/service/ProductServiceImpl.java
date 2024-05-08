package edu.remsely.f1shop.product.service;

import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        Product newProduct = productRepository.save(product);
        log.info("New product added. Product : {}", newProduct);
        return newProduct;
    }

    @Override
    public Product updateProduct(Product product, long productId) {
        Product productToUpdate = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        updateNonNullProperties(productToUpdate, product);
        productRepository.save(productToUpdate);

        log.info("Product updated. Product : {}", productToUpdate);
        return productToUpdate;
    }

    @Override
    public Product getProduct(long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        log.info("Product found. Product : {}", product);
        return product;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        log.info("All products found. List length : {}", products.size());
        return products;
    }

    private void updateNonNullProperties(Product productToUpdate, Product product) {
        if (product.getName() != null)
            productToUpdate.setName(product.getName());

        if (product.getDescription() != null)
            productToUpdate.setDescription(product.getDescription());

        if (product.getPrice() != null)
            productToUpdate.setPrice(product.getPrice());

        if (product.getImage() != null)
            productToUpdate.setImage(product.getImage());

        if (product.getAmount() != null)
            productToUpdate.setAmount(product.getAmount());
    }
}
