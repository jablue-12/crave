package com.crave.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "restaurant_id"})
})
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Comment {
    @Id
    @SequenceGenerator(
            name = "comment_sequence",
            sequenceName = "comment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "comment_sequence"
    )
    private Long id;
    @NonNull
    private Long restaurant_id;
    @NonNull
    private Long user_id;
    @NonNull
    private String title;
    @NonNull
    private String body;
}
