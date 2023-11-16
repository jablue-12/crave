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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

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
            seedRestaurants(restaurantRepository);
            seedIngredients(ingredientRepository);
            seedDishes(ingredientRepository, dishRepository);
            seedAccounts(authenticationService);
        };
    }

    private static void seedRestaurants(RestaurantRepository restaurantRepository) {
        Restaurant mcdo = new Restaurant("McDonalds", "Kildonan 11", 4.5, "testImage");
        Restaurant burgerKing = new Restaurant("Burger King", "Northgate 22", 4.3, "testImage");
        restaurantRepository.saveAll(List.of(mcdo, burgerKing));
    }

    private static void seedAccounts(AuthenticationService authenticationService) {
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
    }

    private static void seedIngredients(IngredientRepository ingredientRepository) {
        Ingredient beef = Ingredient.builder()
                .name("beef")
                .tag("beef")
                .quantity(2)
                .build();

        Ingredient garlic = Ingredient.builder()
                .name("garlic")
                .tag("garlic")
                .quantity(3)
                .build();

        ingredientRepository.saveAll(List.of(beef, garlic));
    }

    private static void seedDishes(IngredientRepository ingredientRepository, DishRepository dishRepository) {
        List<Ingredient> dbIgredients = ingredientRepository.findAll();

        String[] tags = {
                "Pizza",
                "Burgers",
                "Chinese",
                "Mexican",
                "Italian",
                "Sushi",
                "Indian",
                "Thai",
                "Japanese",
                "Greek",
                "Korean",
                "Vietnamese",
                "American",
                "Desserts"
        };

        IntStream.range(0, 10)
                .mapToObj(i -> {
                    String tag = tags[i];
                    return Dish.builder()
                            .name(tag + " Dish " + i)
                            .description("Description for " + tag + " Dish " + i)
                            .tag(tag)
                            .ingredientIds(List.of(dbIgredients.get(0).getId(), dbIgredients.get(1).getId()))
                            .price(1.5F + i)
                            .rating(i / 2F)
                            .build();
                })
                .toList()
                .forEach(dishRepository::save);
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
