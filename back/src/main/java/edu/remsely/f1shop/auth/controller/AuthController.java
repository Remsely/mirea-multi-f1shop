package edu.remsely.f1shop.auth.controller;

import edu.remsely.f1shop.auth.dto.LoginRequest;
import edu.remsely.f1shop.auth.dto.LoginResponse;
import edu.remsely.f1shop.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        log.info("/auth/login POST. Request body : {}", request);
        return authService.login(request);
    }

    @PostMapping("/register")
    public LoginResponse register(@Valid @RequestBody LoginRequest request) {
        log.info("/auth/register POST. Request body : {}", request);
        return authService.register(request);
    }
}
