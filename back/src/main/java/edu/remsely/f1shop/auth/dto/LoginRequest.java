package edu.remsely.f1shop.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
public class LoginRequest {
    @NotNull
    @Email
    private String email;

    @ToString.Exclude
    @NotEmpty
    private String password;
}
