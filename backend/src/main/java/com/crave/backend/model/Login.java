package com.crave.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Login {
    @Id
    private String id;
    @NonNull
    private Long user_id;
    @NonNull
    private String email;
    @NonNull
    private String password;
}
