package edu.remsely.f1shop.product.controller;

import edu.remsely.f1shop.product.dto.ProductDto;
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
public class WishlistController {
    private final ProductService productService;

    @PutMapping("/{productId}/wishlist")
    public ProductDto addInWishlist(@PathVariable long productId, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/{}/wishlist PUT. User id : {}", productId, userId);
        return productService.addProductToWishlist(productId, userId);
    }

    @DeleteMapping("/{productId}/wishlist")
    public ProductDto deleteFromWishlist(@PathVariable long productId, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/{}/wishlist DELETE. User id : {}", productId, userId);
        return productService.removeProductFromWishlist(productId, userId);
    }

    @GetMapping("/wishlist")
    public List<ProductDto> getWishlist(@AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/wishlist GET. User id : {}", userId);
        return productService.getProductsFromWishlist(userId);
    }
}
