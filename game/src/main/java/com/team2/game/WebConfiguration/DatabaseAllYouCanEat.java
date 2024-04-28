package com.team2.game.WebConfiguration;

import com.team2.game.DataModel.Person;
import com.team2.game.PersonManagement.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseAllYouCanEat implements CommandLineRunner {

    @Autowired
    PersonRepository personRepository;

    @Override
    public void run(String... args) throws Exception {
        personRepository.save(Person.builder()
                .name("Alex")
                .email("alex@alex.at")
                .password("43ks7fFIpf")
                .build());
        personRepository.save(Person.builder()
                .name("Bea")
                .email("bea@bea.at")
                .password("2fvlRzewiC")
                .build());
        personRepository.save(Person.builder()
                .name("Clara")
                .email("clara@clara.at")
                .password("3fvlPz49iC")
                .build());
        personRepository.save(Person.builder()
                .name("Dennis")
                .email("dennis@dennis.at")
                .password("4fmnRzewZz")
                .build());
        personRepository.save(Person.builder()
                .name("Eva")
                .email("eva@eva.at")
                .password("5fvl304wiC")
                .build());
        personRepository.save(Person.builder()
                .name("Felix")
                .email("felix@felix.at")
                .password("booo39scl")
                .build());
        personRepository.save(Person.builder()
                .name("Greta")
                .email("greta@greta.at")
                .password("d02mco2klc")
                .build());
    }
}
