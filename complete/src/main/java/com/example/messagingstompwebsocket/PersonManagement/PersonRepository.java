package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataModel.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findByNameAndEmail(String name, String email);
    boolean existsByNameAndPassword(String name, String password);
    boolean existsByNameAndPasswordAndOnlineIsFalse(String name, String password);

    @Transactional
    @Modifying
    @Query("UPDATE Person person set person.online = TRUE WHERE person.name = :name AND person.password = :password")
    void updatePersonOnlineStatus(String name, String password);
}

