package edu.remsely.f1shop.product.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Double price;
    private Boolean inWishlist;
    private Boolean inCart;
}
