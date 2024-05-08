package edu.remsely.f1shop.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ToString.Exclude
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    @ToString.Exclude
    @Column(name = "image_link", nullable = false)
    private String image;

    @Column(nullable = false)
    private Integer amount;
}
