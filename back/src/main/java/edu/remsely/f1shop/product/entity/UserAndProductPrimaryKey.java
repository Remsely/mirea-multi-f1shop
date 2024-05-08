package edu.remsely.f1shop.product.entity;

import edu.remsely.f1shop.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserAndProductPrimaryKey implements Serializable {
    private User user;
    private Product product;
}
