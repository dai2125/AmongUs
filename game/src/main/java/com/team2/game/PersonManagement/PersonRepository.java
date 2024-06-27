package com.team2.game.PersonManagement;

import com.team2.game.DataModel.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findByNameAndEmail(String name, String email);

    boolean existsByNameAndPassword(String name, String password);

    boolean existsByNameAndPasswordAndOnlineIsFalse(String name, String password);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Person person set person.online = TRUE WHERE person.name = :name AND person.password = :password")
    void updatePersonOnlineStatus(String name, String password);

    @Transactional
    @Modifying
    @Query("UPDATE Person person SET person.name = :newName, person.email = :newEmail, person.password = :newPassword WHERE person.name = :oldName AND person.password = :oldPassword")
    void updatePersonDetails(String oldName, String oldPassword, String newName, String newEmail, String newPassword);

}
