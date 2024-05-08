package edu.remsely.f1shop.product.entity;

import edu.remsely.f1shop.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wishlist_products")
@IdClass(WishlistEntityPrimaryKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistEntity {
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Product product;
}
