package edu.remsely.f1shop.user.repository;

import edu.remsely.f1shop.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);

    @Query(value = "SELECT * FROM add_user(:email, :password, :role)", nativeQuery = true)
    User createUser(String email, String password, String role);
}
