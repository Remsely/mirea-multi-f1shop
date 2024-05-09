package edu.remsely.f1shop.order.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderProductDto {
    private long id;
    private String name;
    private String image;
    private double price;
    private int amount;
}
