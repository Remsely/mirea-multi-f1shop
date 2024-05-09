package edu.remsely.f1shop.order.mapper;

import edu.remsely.f1shop.order.dto.OrderCreationDto;
import edu.remsely.f1shop.order.dto.OrderDto;
import edu.remsely.f1shop.order.dto.OrderProductDto;
import edu.remsely.f1shop.order.entity.OrderEntity;
import edu.remsely.f1shop.order.entity.OrderProductEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {
    public OrderEntity toEntity(OrderCreationDto dto) {
        return OrderEntity.builder()
                .id(dto.getId())
                .date(dto.getDate())
                .address(dto.getAddress())
                .comments(dto.getComments())
                .recipientsEmail(dto.getRecipientsEmail())
                .intercom(dto.getIntercom())
                .recipientsPhoneNumber(dto.getRecipientsPhoneNumber())
                .recipientsFullName(dto.getRecipientsFullName())
                .build();
    }

    public OrderDto toDto(OrderEntity order, List<OrderProductDto> products) {
        return OrderDto.builder()
                .id(order.getId())
                .date(order.getDate())
                .address(order.getAddress())
                .recipientsEmail(order.getRecipientsEmail())
                .recipientsFullName(order.getRecipientsFullName())
                .recipientsPhoneNumber(order.getRecipientsPhoneNumber())
                .comments(order.getComments())
                .intercom(order.getIntercom())
                .products(products)
                .build();
    }

    public OrderProductDto toDto(OrderProductEntity orderProductEntity) {
        return OrderProductDto.builder()
                .id(orderProductEntity.getProduct().getId())
                .name(orderProductEntity.getProduct().getName())
                .price(orderProductEntity.getPrice())
                .amount(orderProductEntity.getAmount())
                .image(orderProductEntity.getProduct().getImage())
                .build();
    }

    public List<OrderProductDto> toDtoList(List<OrderProductEntity> orderProductEntities) {
        return orderProductEntities.stream()
                .map(this::toDto)
                .toList();
    }
}
