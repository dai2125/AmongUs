package com.team2.game.GameManagement;

import com.team2.game.DataModel.Game;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

@Service
public interface GameRepository extends JpaRepository<Game, Long> {
    Game findById(long id);

    boolean existsById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Game game SET game.players = :players, game.imposters = :imposters, game.crewMates = :crewMates WHERE game.id = :id")
    void updateGameSettings(long id, int players, int imposters, int crewMates);
}
