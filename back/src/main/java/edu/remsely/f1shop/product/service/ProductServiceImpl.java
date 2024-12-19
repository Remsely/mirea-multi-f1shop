package edu.remsely.f1shop.product.service;

import edu.remsely.f1shop.product.dto.ProductDto;
import edu.remsely.f1shop.product.entity.CartEntity;
import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.entity.UserAndProductPrimaryKey;
import edu.remsely.f1shop.product.entity.WishlistEntity;
import edu.remsely.f1shop.product.mapper.ProductMapper;
import edu.remsely.f1shop.product.repository.CartRepository;
import edu.remsely.f1shop.product.repository.ProductRepository;
import edu.remsely.f1shop.product.repository.WishlistRepository;
import edu.remsely.f1shop.user.entity.User;
import edu.remsely.f1shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
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
    private final CartRepository cartRepository;
    private final ProductMapper productMapper;
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    @Override
    public Product addProduct(Product product) {
        Product newProduct = productRepository.save(product);
        log.info("New product added. Product : {}", newProduct);
        return newProduct;
    }

    @Transactional
    @Override
    public Product updateProduct(Product product, long productId) {
        Product productToUpdate = findProduct(productId);

        updateNonNullProperties(productToUpdate, product);
        productRepository.save(productToUpdate);

        log.info("Product updated. Product : {}", productToUpdate);
        return productToUpdate;
    }

    @Transactional(readOnly = true)
    @Override
    public ProductDto getProduct(long productId, long userId) {
        User user = findUser(userId);
        Product product = findProduct(productId);

        boolean inWishlist = isProductInWishlist(product, user);
        boolean inCart = isProductInCart(product, user);

        log.info("Product found. Product : {}", product);
        return productMapper.toDto(product, inWishlist, inCart);
    }

    @Transactional(readOnly = true)
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

        wishlistRepository.deleteById(UserAndProductPrimaryKey.builder()
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

        log.info("User's with id {} wishlist found. List length : {}", userId, products.size());
        return products.stream()
                .map(product -> productMapper.toDto(product, true, false)).
                collect(Collectors.toList());
    }

    @Transactional
    @Override
    public CartEntity addProductToCart(long productId, int amount, long userId) {
        User user = findUser(userId);
        Product product = findProduct(productId);

        checkProductAmount(product, amount);

        CartEntity cartEntity = cartRepository.addToCart(user.getId(), productId, amount);

        log.info("Product with id {} added to user's with id {} cart. Cart entity : {}", productId, userId, cartEntity);
        return cartEntity;
    }

    @Transactional
    @Override
    public void removeProductFromCart(long productId, long userId) {
        User user = findUser(userId);
        Product product = findProduct(productId);

        String sql = "CALL remove_from_cart(?, ?)";

        jdbcTemplate.update(sql, user.getId(), product.getId());

        log.info("Product with id {} removed from user's with id {} cart.", productId, userId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<CartEntity> getProductsFromCart(long userId) {
        User user = findUser(userId);
        List<CartEntity> cartEntities = cartRepository.findByUser(user);
        log.info("User's with id {} cart found. List length : {}", userId, cartEntities.size());
        return cartEntities;
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

    private Set<Long> getWishlistProductsIds(List<WishlistEntity> wishlistProducts) {
        return wishlistProducts.stream()
                .map(wishlistEntity -> wishlistEntity.getProduct().getId())
                .collect(Collectors.toSet());
    }

    private User findUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    private Product findProduct(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    private void checkProductAmount(Product product, int amount) {
        if (product.getAmount() - amount < 0)
            throw new RuntimeException("No enough product amount!");
    }

    private Boolean isProductInWishlist(Product product, User user) {
        return wishlistRepository.existsByProductAndUser(product, user);
    }

    private Boolean isProductInCart(Product product, User user) {
        return cartRepository.existsByProductAndUser(product.getId(), user.getId());
    }
}
