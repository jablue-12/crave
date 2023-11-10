package com.crave.backend.config;

import com.crave.backend.enums.UserRole;
import com.crave.backend.model.Dish;
import com.crave.backend.model.Ingredient;
import com.crave.backend.model.Restaurant;
import com.crave.backend.model.auth.RegisterRequest;
import com.crave.backend.repository.AccountRepository;
import com.crave.backend.repository.DishRepository;
import com.crave.backend.repository.IngredientRepository;
import com.crave.backend.repository.RestaurantRepository;

import com.crave.backend.service.AuthenticationService;
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

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class CraveConfig {
    private final AccountRepository accountRepository;

    @Bean
    CommandLineRunner commandLineRunner(
            RestaurantRepository restaurantRepository,
            IngredientRepository ingredientRepository,
            DishRepository dishRepository,
            AuthenticationService authenticationService) {
        return args -> {
            // TODO: remove fake data
            // Restaurants
            Restaurant mcdo = new Restaurant("McDonalds", "Kildonan 11", 4.5, "testImage");
            Restaurant burgerKing = new Restaurant("Burger King", "Northgate 22", 4.3, "testImage");
            restaurantRepository.saveAll(List.of(mcdo, burgerKing));

            //Ingredients
            Ingredient ingredient1 = Ingredient.builder()
                    .name("beef")
                    .tag("beef")
                    .quantity(2)
                    .build();

            Ingredient ingredient2 = Ingredient.builder()
                    .name("garlic")
                    .tag("garlic")
                    .quantity(3)
                    .build();
            ingredientRepository.saveAll(List.of(ingredient1, ingredient2));

            List<Ingredient> dbIgredients = ingredientRepository.findAll();

            // Dish
            Dish dish = Dish.builder()
                    .name("Beef Wellington")
                    .description("Description for beef wellington")
                    .tag("tag1")
                    .imageUrl("beef-wellington-img")
                    .ingredientIds(List.of(dbIgredients.get(0).getId(), dbIgredients.get(1).getId()))
                    .price(25.99f)
                    .build();
            dishRepository.save(dish);
            
            // Account registrations
            RegisterRequest userRegistration = RegisterRequest.builder()
                    .firstName("User")
                    .lastName("Demo")
                    .email("userdemo@gmail.com")
                    .password("demo")
                    .userRole(UserRole.USER)
                    .build();

            RegisterRequest adminRegistration = RegisterRequest.builder()
                    .firstName("Admin")
                    .lastName("Demo")
                    .email("admindemo@gmail.com")
                    .password("demo")
                    .userRole(UserRole.ADMIN)
                    .build();

            authenticationService.register(userRegistration);
            authenticationService.register(adminRegistration);

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
