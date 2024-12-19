package edu.remsely.f1shop.product.repository;

import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(" select p " +
            "from WishlistEntity w " +
            "join w.product p " +
            "where w.user = :user")
    List<Product> findInWishlist(User user);

    @Query(value = "SELECT * from get_filtered_products(:categories, :searchQuery, :sortOrder)", nativeQuery = true)
    List<Product> getFilteredProducts(String categories, String searchQuery, String sortOrder);
}
