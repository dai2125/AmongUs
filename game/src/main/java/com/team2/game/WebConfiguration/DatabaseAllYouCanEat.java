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
        personRepository.save(Person.builder()
                .name("Regine")
                .email("regine.kadgien@fhv.at")
                .password("bre")
                .build());
        personRepository.save(Person.builder()
                .name("Jutta")
                .email("jutta.lung-babutzky@fhv.at")
                .password("lbju")
                .build());
        personRepository.save(Person.builder()
                .name("Jan")
                .email("jan.amann@fhv.at")
                .password("jam6924")
                .build());
        personRepository.save(Person.builder()
                .name("Wolfgang")
                .email("wolfgang.auer@fhv.at")
                .password("aw")
                .build());
        personRepository.save(Person.builder()
                .name("Peter")
                .email("peter.stadelwieser@fhv.at")
                .password("pst7730")
                .build());
        personRepository.save(Person.builder()
                .name("Peter Hoffman")
                .email("peter.hoffman@fhv.at")
                .password("hope")
                .build());
        personRepository.save(Person.builder()
                .name("Christoph")
                .email("christoph.loacker@fhv.at")
                .password("clo9807")
                .build());
        personRepository.save(Person.builder()
                .name("Andrea")
                .email("andrea.janes@fhv.at")
                .password("aja5506")
                .build());
        personRepository.save(Person.builder()
                .name("Gerhard")
                .email("gerhard.gaube@fhv.at")
                .password("gga7456")
                .build());
        personRepository.save(Person.builder()
                .name("Andreas")
                .email("andreas.gottardi@fhv.at")
                .password("ago1516")
                .build());
    }
}
