package edu.remsely.f1shop.order.controller;

import edu.remsely.f1shop.order.dto.OrderCreationDto;
import edu.remsely.f1shop.order.dto.OrderDto;
import edu.remsely.f1shop.order.entity.OrderEntity;
import edu.remsely.f1shop.order.mapper.OrderMapper;
import edu.remsely.f1shop.order.service.OrderService;
import edu.remsely.f1shop.security.principal.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper orderMapper;

    @PostMapping
    public OrderDto addOrder(@Valid @RequestBody OrderCreationDto dto, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/orders POST. User id : {}. Request body : {}", userId, dto);
        OrderEntity order = orderMapper.toEntity(dto);
        return orderService.createOrder(order, userId);
    }

    @GetMapping("/{id}")
    public OrderDto getOrder(@PathVariable long id, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/orders/{} GET. User id : {}.", id, userId);
        return orderService.getOrderById(id, userId);
    }

    @GetMapping
    public List<OrderDto> getOrder(@AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/orders GET. User id : {}.", userId);
        return orderService.getOrdersByUserId(userId);
    }
}
