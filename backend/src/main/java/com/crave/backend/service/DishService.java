package com.crave.backend.service;

import com.crave.backend.model.Dish;
import com.crave.backend.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {
    @Autowired
    private DishRepository dishRepository;

    public List<Dish> getByTags(List<String> tags) {
        return dishRepository.findByTagIn(tags);
    }
}

