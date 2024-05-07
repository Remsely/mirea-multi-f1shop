package edu.remsely.f1shop.controller;

import edu.remsely.f1shop.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class HelloController {
    @GetMapping
    public String hello() {
        return "Hello World!";
    }

    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return "I am secured! User: " + userPrincipal.getEmail() + "; id : " + userPrincipal.getUserId();
    }
}
