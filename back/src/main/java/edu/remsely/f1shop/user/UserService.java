package edu.remsely.f1shop.user;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private static final String EXISTING_EMAIL = "test@test.com";
    public Optional<User> findByEmail(String email) {
        if (!email.equalsIgnoreCase(EXISTING_EMAIL)) {
            return Optional.empty();
        }
        var user = User.builder()
                .id(1L)
                .email(EXISTING_EMAIL)
                .password("$2a$12$waCT/NkAN6G0SWEMxYDzVOBsb8sry7svIRXXb8p4caTybZkRp6N2C")
                .role("ADMIN")
                .build();
        return Optional.of(user);
    }
}
