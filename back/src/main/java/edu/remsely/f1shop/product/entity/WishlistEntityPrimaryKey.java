package edu.remsely.f1shop.product.entity;

import edu.remsely.f1shop.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistEntityPrimaryKey implements Serializable {
    private User user;
    private Product product;
}
