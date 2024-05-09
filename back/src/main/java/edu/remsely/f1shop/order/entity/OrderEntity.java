package edu.remsely.f1shop.order.entity;


import edu.remsely.f1shop.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime date;

    @ToString.Exclude
    @Column(name = "recipients_full_name", nullable = false)
    private String recipientsFullName;

    @ToString.Exclude
    @Column(name = "recipients_phone_number", nullable = false)
    private String recipientsPhoneNumber;

    @ToString.Exclude
    @Column(name = "recipients_email", nullable = false)
    private String recipientsEmail;

    @ToString.Exclude
    @Column(nullable = false)
    private String address;

    @ToString.Exclude
    @Column(nullable = false)
    private String intercom;

    @ToString.Exclude
    private String comments;
}
