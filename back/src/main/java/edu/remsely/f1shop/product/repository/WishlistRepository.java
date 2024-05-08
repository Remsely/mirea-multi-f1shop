package edu.remsely.f1shop.product.repository;

import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.user.entity.User;
import edu.remsely.f1shop.product.entity.WishlistEntity;
import edu.remsely.f1shop.product.entity.WishlistEntityPrimaryKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<WishlistEntity, WishlistEntityPrimaryKey> {
    boolean existsByProductAndUser(Product product, User user);

    List<WishlistEntity> findByUser(User user);
}
