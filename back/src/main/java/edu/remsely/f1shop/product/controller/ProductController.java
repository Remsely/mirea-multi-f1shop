package edu.remsely.f1shop.product.controller;

import edu.remsely.f1shop.product.dto.ProductCreationDto;
import edu.remsely.f1shop.product.dto.ProductDto;
import edu.remsely.f1shop.product.dto.ProductUpdateDto;
import edu.remsely.f1shop.product.entity.Product;
import edu.remsely.f1shop.product.mapper.ProductMapper;
import edu.remsely.f1shop.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ProductDto addProduct(@Valid @RequestBody ProductCreationDto dto) {
        log.info("/products POST. RequestBody : {}", dto);
        Product product = productMapper.toEntity(dto);
        return productMapper.toDto(productService.addProduct(product));
    }

    @PatchMapping("/{id}")
    public ProductDto updateProduct(@Valid @RequestBody ProductUpdateDto dto, @PathVariable Long id) {
        log.info("/products/{} PATCH. RequestBody : {}", id, dto);
        Product product = productMapper.toEntity(dto);
        return productMapper.toDto(productService.updateProduct(product, id));
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        log.info("/products/{} GET.", id);
        return productMapper.toDto(productService.getProduct(id));
    }

    @GetMapping
    public List<ProductDto> getProducts() {
        log.info("/products GET.");
        return productMapper.toDtoList(productService.getAllProducts());
    }
}
