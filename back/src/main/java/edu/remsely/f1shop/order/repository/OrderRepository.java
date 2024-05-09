package edu.remsely.f1shop.order.repository;

import edu.remsely.f1shop.order.entity.OrderEntity;
import edu.remsely.f1shop.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUser(User user);
}
