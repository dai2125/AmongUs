package com.example.messagingstompwebsocket.Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    PersonRepository personRepository;

    @PostMapping("/addPerson")
    public String addPerson(@RequestBody Person person) {
        personRepository.save(person);
        return "Person added successfully";
    }
}
