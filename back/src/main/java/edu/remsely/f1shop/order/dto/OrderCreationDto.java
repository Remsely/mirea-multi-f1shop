package edu.remsely.f1shop.order.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderCreationDto {
    @NotNull
    private LocalDateTime date;

    @NotEmpty
    private String recipientsFullName;

    @NotEmpty
    private String recipientsPhoneNumber;

    @NotEmpty
    private String recipientsEmail;

    @NotEmpty
    private String address;

    @NotEmpty
    private String intercom;

    private String comments;
}
