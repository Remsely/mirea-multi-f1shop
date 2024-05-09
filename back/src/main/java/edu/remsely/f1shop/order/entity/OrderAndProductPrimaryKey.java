package edu.remsely.f1shop.order.entity;

import edu.remsely.f1shop.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class OrderAndProductPrimaryKey implements Serializable {
    private Product product;
    private OrderEntity order;
}
