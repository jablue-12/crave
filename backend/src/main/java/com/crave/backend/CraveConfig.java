package com.crave.backend;

import com.crave.backend.model.Restaurant;
import com.crave.backend.repository.RestaurantRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CraveConfig {
    @Bean
    CommandLineRunner commandLineRunner(RestaurantRepository restaurantRepository) {
        return args -> {
            // TODO: remove fake data
            Restaurant mcdo = new Restaurant("McDonalds", "Kildonan 11", 4.5, "testImage");
            Restaurant burgerKing = new Restaurant("Burger King", "Northgate 22", 4.3, "testImage");
            restaurantRepository.saveAll(List.of(mcdo, burgerKing));
        };
    }
}
