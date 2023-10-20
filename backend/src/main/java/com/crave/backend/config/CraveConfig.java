package com.crave.backend.config;

import com.crave.backend.model.Restaurant;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.repository.RestaurantRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class CraveConfig {
    private final AccountRepository accountRepository;

    @Bean
    CommandLineRunner commandLineRunner(RestaurantRepository restaurantRepository) {
        return args -> {
            // TODO: remove fake data
            Restaurant mcdo = new Restaurant("McDonalds", "Kildonan 11", 4.5, "testImage");
            Restaurant burgerKing = new Restaurant("Burger King", "Northgate 22", 4.3, "testImage");
            restaurantRepository.saveAll(List.of(mcdo, burgerKing));
        };
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> accountRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        // data access object responsible to fetch user details, and encode passwords
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());

        // Encode the password
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
