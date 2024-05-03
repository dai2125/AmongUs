package com.team2.game.DataModel;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "game")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false, name = "players")
    private int players;
    @Column(nullable = false, name = "crew-mates")
    private int crewMates;
    @Column(nullable = false, name = "imposters")
    private int imposters;


}
