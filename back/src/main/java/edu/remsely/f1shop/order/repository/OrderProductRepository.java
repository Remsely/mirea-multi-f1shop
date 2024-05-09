package edu.remsely.f1shop.order.repository;

import edu.remsely.f1shop.order.entity.OrderAndProductPrimaryKey;
import edu.remsely.f1shop.order.entity.OrderEntity;
import edu.remsely.f1shop.order.entity.OrderProductEntity;
import edu.remsely.f1shop.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProductEntity, OrderAndProductPrimaryKey> {
    List<OrderProductEntity> findByOrder(OrderEntity order);

    @Query(" select op " +
            "from OrderProductEntity op " +
            "where op.order.user = :user")
    List<OrderProductEntity> findByUser(User user);
}
