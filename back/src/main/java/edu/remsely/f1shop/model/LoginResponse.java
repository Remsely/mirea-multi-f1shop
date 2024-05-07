package edu.remsely.f1shop.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private String accessToken;
    private boolean authenticated;
}
