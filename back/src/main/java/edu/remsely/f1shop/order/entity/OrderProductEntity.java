package edu.remsely.f1shop.order.entity;

import edu.remsely.f1shop.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_products")
@IdClass(OrderAndProductPrimaryKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductEntity {
    @ToString.Exclude
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private OrderEntity order;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private Double price;
}
