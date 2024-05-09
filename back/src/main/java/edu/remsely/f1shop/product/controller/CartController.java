package edu.remsely.f1shop.product.controller;

import edu.remsely.f1shop.order.dto.OrderProductDto;
import edu.remsely.f1shop.product.mapper.ProductMapper;
import edu.remsely.f1shop.product.service.ProductService;
import edu.remsely.f1shop.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class CartController {
    private final ProductService productService;
    private final ProductMapper productMapper;

    @PutMapping("/{productId}/cart")
    public OrderProductDto addCartProduct(@PathVariable long productId,
                                          @RequestParam Integer amount,
                                          @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/{}/cart?amount={} PUT. User id : {}", productId, amount, userId);
        return productMapper.toDto(productService.addProductToCart(productId, amount, userId));
    }

    @DeleteMapping("/{productId}/cart")
    public void removeCartProduct(@PathVariable long productId, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/{}/cart DELETE. User id : {}", productId, userId);
        productService.removeProductFromCart(productId, userId);
    }

    @GetMapping("/cart")
    public List<OrderProductDto> getCartProducts(@AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/cart GET. User id : {}", userId);
        return productMapper.toDtoList(productService.getProductsFromCart(userId));
    }
}
