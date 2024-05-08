package edu.remsely.f1shop.product.repository;

import edu.remsely.f1shop.product.entity.CartEntity;
import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.entity.UserAndProductPrimaryKey;
import edu.remsely.f1shop.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartEntity, UserAndProductPrimaryKey> {
    List<CartEntity> findByUser(User user);

    boolean existsByProductAndUser(Product product, User user);
}
