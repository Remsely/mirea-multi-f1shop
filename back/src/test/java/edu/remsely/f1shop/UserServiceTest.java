package edu.remsely.f1shop;

import edu.remsely.f1shop.user.entity.User;
import edu.remsely.f1shop.user.entity.UserRole;
import edu.remsely.f1shop.user.repository.UserRepository;
import edu.remsely.f1shop.user.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindUserByEmailUserExists() {
        String email = "test@example.com";
        User mockUser = new User();
        mockUser.setEmail(email);

        when(userRepository.findByEmailIgnoreCase(email)).thenReturn(Optional.of(mockUser));

        User result = userService.findUserByEmail(email);
        assertEquals(mockUser, result);
        verify(userRepository).findByEmailIgnoreCase(email);
    }

    @Test
    public void testFindUserByEmailUserDoesNotExist() {
        String email = "nonexistent@example.com";

        when(userRepository.findByEmailIgnoreCase(email)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.findUserByEmail(email));
        verify(userRepository).findByEmailIgnoreCase(email);
    }

    @Test
    public void testAddUserValidUser() {
        User newUser = new User();
        newUser.setEmail("newuser@example.com");
        newUser.setPassword("password123");
        newUser.setRole(UserRole.USER);

        when(passwordEncoder.encode(anyString())).then(returnsFirstArg());
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        User savedUser = userService.addUser(newUser);

        assertNotNull(savedUser);
        assertEquals(newUser.getEmail(), savedUser.getEmail());
        verify(userRepository).save(newUser);
        verify(passwordEncoder).encode("password123");
    }

    @Test
    public void testUserExistByEmailUserExists() {
        String email = "existing@example.com";

        when(userRepository.existsByEmailIgnoreCase(email)).thenReturn(true);

        boolean exists = userService.userExistByEmail(email);

        assertTrue(exists);
        verify(userRepository).existsByEmailIgnoreCase(email);
    }

    @Test
    public void testUserExistByEmailUserDoesNotExist() {
        String email = "nonexistent@example.com";

        when(userRepository.existsByEmailIgnoreCase(email)).thenReturn(false);

        boolean exists = userService.userExistByEmail(email);

        assertFalse(exists);
        verify(userRepository).existsByEmailIgnoreCase(email);
    }
}
