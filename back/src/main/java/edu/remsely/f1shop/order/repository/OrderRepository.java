package edu.remsely.f1shop.order.repository;

import edu.remsely.f1shop.order.entity.OrderEntity;
import edu.remsely.f1shop.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUser(User user);

    @Query(value = "SELECT * from create_order(" +
            ":userId, " +
            ":recipientsFullName, " +
            ":recipientsPhoneNumber, " +
            ":recipientsEmail, " +
            ":address, " +
            ":intercom, " +
            ":comments)", nativeQuery = true)
    OrderEntity createOrder(
            Long userId,
            String recipientsFullName,
            String recipientsPhoneNumber,
            String recipientsEmail,
            String address,
            String intercom,
            String comments
    );
}
