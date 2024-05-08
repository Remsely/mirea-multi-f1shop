package edu.remsely.f1shop.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartProductDto {
    private long id;
    private String name;
    private String image;
    private double price;
    private int amount;
}
