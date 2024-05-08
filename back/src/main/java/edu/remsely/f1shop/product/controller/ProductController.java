package edu.remsely.f1shop.product.controller;

import edu.remsely.f1shop.product.dto.ProductCreationDto;
import edu.remsely.f1shop.product.dto.ProductDto;
import edu.remsely.f1shop.product.dto.ProductUpdateDto;
import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.mapper.ProductMapper;
import edu.remsely.f1shop.product.service.ProductService;
import edu.remsely.f1shop.security.principal.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductMapper productMapper;

    @PostMapping
    public ProductCreationDto addProduct(@Valid @RequestBody ProductCreationDto dto) {
        log.info("/products POST. RequestBody : {}", dto);
        Product product = productMapper.toEntity(dto);
        return productMapper.toDto(productService.addProduct(product));
    }

    @PatchMapping("/{id}")
    public ProductCreationDto updateProduct(@Valid @RequestBody ProductUpdateDto dto, @PathVariable Long id) {
        log.info("/products/{} PATCH. RequestBody : {}", id, dto);
        Product product = productMapper.toEntity(dto);
        return productMapper.toDto(productService.updateProduct(product, id));
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products/{} GET. User id : {}", id, userId);
        return productService.getProduct(id, userId);
    }

    @GetMapping
    public List<ProductDto> getProducts(@AuthenticationPrincipal UserPrincipal user) {
        long userId = user.getUserId();
        log.info("/products GET. User id : {}", userId);
        return productService.getAllProducts(userId);
    }
}
