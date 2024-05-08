package edu.remsely.f1shop.product.mapper;

import edu.remsely.f1shop.product.dto.ProductCreationDto;
import edu.remsely.f1shop.product.dto.ProductDto;
import edu.remsely.f1shop.product.entity.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    public Product toEntity(ProductDto dto) {
        return Product.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .image(dto.getImage())
                .price(dto.getPrice())
                .build();
    }

    public Product toEntity(ProductCreationDto dto) {
        return Product.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .image(dto.getImage())
                .price(dto.getPrice())
                .amount(dto.getAmount())
                .build();
    }

    public ProductDto toDto (Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .image(product.getImage())
                .inWishlist(false)
                .price(product.getPrice())
                .build();
    }

    public List<ProductDto> toDtoList(List<Product> products) {
        return products.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
