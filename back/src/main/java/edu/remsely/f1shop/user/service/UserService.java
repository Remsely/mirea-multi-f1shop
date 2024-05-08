package edu.remsely.f1shop.user.service;

import edu.remsely.f1shop.user.entity.User;

public interface UserService {
    User findByEmail(String email);

    User save(User user);

    User findById(Long id);

    boolean existByEmail(String email);
}
