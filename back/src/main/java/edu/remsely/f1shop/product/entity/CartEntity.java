package edu.remsely.f1shop.product.entity;

import edu.remsely.f1shop.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_products")
@IdClass(UserAndProductPrimaryKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartEntity {
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer amount;
}
