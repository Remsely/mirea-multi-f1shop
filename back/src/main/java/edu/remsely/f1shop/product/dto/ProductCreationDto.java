package edu.remsely.f1shop.product.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class ProductCreationDto {
    private Long id;

    @NotNull
    private String name;

    @NotEmpty
    @Length(min = 1, max = 1000)
    private String description;

    @NotEmpty
    private String image;

    @NotNull
    @Positive
    private Double price;

    @NotNull
    @PositiveOrZero
    private Integer amount;
}
