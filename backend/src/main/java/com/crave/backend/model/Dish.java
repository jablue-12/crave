package com.crave.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dish {
    @Id
    @SequenceGenerator(
            name = "dish_sequence",
            sequenceName = "dish_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "dish_sequence"
    )
    private Long id;
    private String name;
    private String description;
    private String tag;
    private float price;
    private float rating;

    @Lob // Store as Large object in db
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @ElementCollection
    @CollectionTable(
            name = "dish_ingredients",
            joinColumns = @JoinColumn(name = "dish_id")
    )
    @Column(name = "ingredient_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Long> ingredientIds;

    // Transient field to load ingredients during retrieval
    @Transient
    private List<Ingredient> ingredients;

    @JsonIgnore
    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
