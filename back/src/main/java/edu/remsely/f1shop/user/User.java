package edu.remsely.f1shop.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private Long id;

    private String email;

    @JsonIgnore
    private String password;

    private String role;
}
