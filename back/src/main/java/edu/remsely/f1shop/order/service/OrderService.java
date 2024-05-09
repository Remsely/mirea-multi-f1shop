package edu.remsely.f1shop.order.service;

import edu.remsely.f1shop.order.dto.OrderDto;
import edu.remsely.f1shop.order.entity.OrderEntity;

import java.util.List;

public interface OrderService {
    OrderDto createOrder(OrderEntity order, long userId);

    OrderDto getOrderById(long orderId, long userId);

    List<OrderDto> getOrdersByUserId(long userId);
}
