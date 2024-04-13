package com.example.messagingstompwebsocket.DataModel;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false, unique = true, name = "name")
    private String name;

    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Column(nullable = false, unique = true, name = "password")
    private String password;

    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "online")
    boolean online = false;

    @PrePersist
    public void prePersist() {
        if(this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}
