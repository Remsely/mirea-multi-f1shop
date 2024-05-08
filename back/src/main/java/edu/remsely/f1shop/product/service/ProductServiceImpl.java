package edu.remsely.f1shop.product.service;

import edu.remsely.f1shop.product.dto.ProductDto;
import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.entity.WishlistEntity;
import edu.remsely.f1shop.product.entity.WishlistEntityPrimaryKey;
import edu.remsely.f1shop.product.mapper.ProductMapper;
import edu.remsely.f1shop.product.repository.ProductRepository;
import edu.remsely.f1shop.product.repository.WishlistRepository;
import edu.remsely.f1shop.user.entity.User;
import edu.remsely.f1shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;

    @Override
    public Product addProduct(Product product) {
        Product newProduct = productRepository.save(product);
        log.info("New product added. Product : {}", newProduct);
        return newProduct;
    }

    @Override
    public Product updateProduct(Product product, long productId) {
        Product productToUpdate = findProduct(productId);

        updateNonNullProperties(productToUpdate, product);
        productRepository.save(productToUpdate);

        log.info("Product updated. Product : {}", productToUpdate);
        return productToUpdate;
    }

    @Override
    public ProductDto getProduct(long productId, long userId) {
        User user = findUser(userId);
        Product product = findProduct(productId);
        Boolean inWishlist = isProductInWishlist(product, user);

        log.info("Product found. Product : {}", product);
        return productMapper.toDto(product, inWishlist, false);
    }

    @Override
    public List<ProductDto> getAllProducts(long userId) {
        User user = findUser(userId);
        List<Product> products = productRepository.findAll();

        List<WishlistEntity> wishlistProducts = wishlistRepository.findByUser(user);
        Set<Long> wishlistProductsIds = getWishlistProductsIds(wishlistProducts);

        log.info("All products found. List length : {}", products.size());

        return products.stream()
                .map(product -> {
                            boolean inWishlist = wishlistProductsIds.contains(product.getId());
                            return productMapper.toDto(product, inWishlist, false);
                        }
                ).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ProductDto addProductToWishlist(long productId, long userId) {
        User user = findUser(userId);
        Product product = findProduct(productId);

        wishlistRepository.save(WishlistEntity.builder()
                .user(user)
                .product(product)
                .build()
        );
        log.info("Product with id {} added to user's with id {} wishlist.", productId, userId);
        return getProduct(productId, userId);
    }

    @Transactional
    @Override
    public ProductDto removeProductFromWishlist(long productId, long userId) {
        User user = findUser(userId);
        Product product = findProduct(productId);

        wishlistRepository.deleteById(WishlistEntityPrimaryKey.builder()
                .user(user)
                .product(product)
                .build()
        );
        log.info("Product with id {} removed from user's with id {} wishlist.", productId, userId);
        return getProduct(productId, userId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductDto> getProductsFromWishlist(long userId) {
        User user = findUser(userId);
        List<Product> products = productRepository.findInWishlist(user);

        return products.stream()
                .map(product -> productMapper.toDto(product, true, false)).
                collect(Collectors.toList());
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

    private Boolean isProductInWishlist(Product product, User user) {
        return wishlistRepository.existsByProductAndUser(product, user);
    }

    private User findUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    private Product findProduct(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    private Set<Long> getWishlistProductsIds(List<WishlistEntity> wishlistProducts) {
        return wishlistProducts.stream()
                .map(wishlistEntity -> wishlistEntity.getProduct().getId())
                .collect(Collectors.toSet());
    }
}
