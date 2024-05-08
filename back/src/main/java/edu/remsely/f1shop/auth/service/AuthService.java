package edu.remsely.f1shop.auth.service;

import edu.remsely.f1shop.auth.dto.LoginRequest;
import edu.remsely.f1shop.auth.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    LoginResponse register(LoginRequest request);
}
