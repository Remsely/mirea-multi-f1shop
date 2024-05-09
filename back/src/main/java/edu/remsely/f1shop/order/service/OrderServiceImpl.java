package edu.remsely.f1shop.order.service;

import edu.remsely.f1shop.order.dto.OrderDto;
import edu.remsely.f1shop.order.entity.OrderEntity;
import edu.remsely.f1shop.order.entity.OrderProductEntity;
import edu.remsely.f1shop.order.mapper.OrderMapper;
import edu.remsely.f1shop.order.repository.OrderProductRepository;
import edu.remsely.f1shop.order.repository.OrderRepository;
import edu.remsely.f1shop.product.entity.CartEntity;
import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.repository.CartRepository;
import edu.remsely.f1shop.product.repository.ProductRepository;
import edu.remsely.f1shop.user.entity.User;
import edu.remsely.f1shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderProductRepository orderProductRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    @Transactional
    @Override
    public OrderDto createOrder(OrderEntity order, long userId) {
        User user = findUser(userId);
        order.setUser(user);

        List<CartEntity> cartEntities = cartRepository.findByUser(user);

        if (cartEntities.isEmpty())
            throw new RuntimeException("Cart Is Empty!");

        OrderEntity savedOrder = orderRepository.save(order);
        Set<OrderProductEntity> orderProductEntities = getCartProductsIds(cartEntities, savedOrder);

        List<Product> productsToUpdateCount = orderProductEntities.stream()
                .map(orderProductEntity -> {
                    Product product = orderProductEntity.getProduct();
                    int newAmount = product.getAmount() - orderProductEntity.getAmount();

                    if (newAmount < 0)
                        throw new RuntimeException("No enough product amount!");

                    product.setAmount(newAmount);
                    return product;
                }).toList();

        productRepository.saveAll(productsToUpdateCount);
        List<OrderProductEntity> savedOrderProducts = orderProductRepository.saveAll(orderProductEntities);
        cartRepository.deleteAll(cartEntities);

        log.info("User's with id {} order added. Order length : {}", userId, savedOrderProducts.size());
        return orderMapper.toDto(savedOrder, orderMapper.toDtoList(savedOrderProducts));
    }

    @Transactional(readOnly = true)
    @Override
    public OrderDto getOrderById(long orderId, long userId) {
        User user = findUser(userId);
        OrderEntity order = findOrder(orderId);

        if (!Objects.equals(order.getUser().getId(), user.getId())) {
            throw new RuntimeException("This user has not access to this order!");
        }

        List<OrderProductEntity> orderProductEntities = orderProductRepository.findByOrder(order);

        log.info("User's with id {} order with id {} has been fond. Order length : {}",
                userId, orderId, orderProductEntities.size());
        return orderMapper.toDto(order, orderMapper.toDtoList(orderProductEntities));
    }

    @Transactional(readOnly = true)
    @Override
    public List<OrderDto> getOrdersByUserId(long userId) {
        User user = findUser(userId);

        List<OrderEntity> orders = orderRepository.findByUser(user);
        List<OrderProductEntity> ordersProducts = orderProductRepository.findByUser(user);

        Map<OrderEntity, List<OrderProductEntity>> orderProductsByOrder = ordersProducts.stream()
                .collect(Collectors.groupingBy(OrderProductEntity::getOrder));

        log.info("User's with id {} orders have been fond. List length : {}",
                userId, orders.size());

        return orders.stream().map(order -> {
            List<OrderProductEntity> orderProducts = orderProductsByOrder.get(order);
            return orderMapper.toDto(order, orderMapper.toDtoList(orderProducts));
        }).toList();
    }

    private User findUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    private OrderEntity findOrder(long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
    }

    private Set<OrderProductEntity> getCartProductsIds(List<CartEntity> cartEntities, OrderEntity order) {
        return cartEntities.stream()
                .map(cartEntity -> OrderProductEntity.builder()
                        .order(order)
                        .product(cartEntity.getProduct())
                        .price(cartEntity.getProduct().getPrice())
                        .amount(cartEntity.getAmount())
                        .build()
                )
                .collect(Collectors.toSet());
    }
}
