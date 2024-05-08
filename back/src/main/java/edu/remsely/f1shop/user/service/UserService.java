package edu.remsely.f1shop.user.service;

import edu.remsely.f1shop.user.entity.User;

public interface UserService {
    User findUserByEmail(String email);

    User addUser(User user);

    boolean userExistByEmail(String email);
}
