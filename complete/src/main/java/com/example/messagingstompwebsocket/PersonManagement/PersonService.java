package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataModel.Person;
import com.example.messagingstompwebsocket.DataTransferObject.LoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.SignUpDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionCustom;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage.INVALID_NAME;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private static final Logger logger = LoggerFactory.getLogger(PersonService.class);

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public boolean signUpRequest(SignUpDTO signUpDTO) throws ResponseStatusException {
        if(!PersonValidationUtil.validatePersonName(signUpDTO.getName())) {
            logger.info("Invalid name: %s".formatted(signUpDTO.getName()));
            throw new ResponseStatusExceptionCustom(INVALID_NAME);
        }

        if(!PersonValidationUtil.validatePersonEmail(signUpDTO.getEmail())) {
            logger.info("Invalid email: %s".formatted(signUpDTO.getEmail()));
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_EMAIL);
        }

        if(!PersonValidationUtil.validatePersonPassword(signUpDTO.getPassword())) {
            logger.info("Invalid password: %s".formatted(signUpDTO.getPassword()));
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_PASSWORD);
        }

        if(!PersonValidationUtil.validatePersonPasswordEqualsPasswordConfirm(signUpDTO.getPassword(), signUpDTO.getPasswordConfirm())) {
            logger.info("Passwords do not match: %s".formatted(signUpDTO.getPassword()));
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.PASSWORDS_DO_NOT_MATCH);
        }

        Person person = this.personRepository.findByNameAndEmail(signUpDTO.getName(), signUpDTO.getEmail());
        if(person == null) {
            personRepository.save(Person.builder().name(signUpDTO.getName()).email(signUpDTO.getEmail()).password(signUpDTO.getPassword()).build());
            return true;
        }
        logger.info("User already exists: %s".formatted(signUpDTO.getName()));
        throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS);
    }

    public boolean loginRequest(LoginDTO loginDTO) {
        if(!personRepository.existsByNameAndPassword(loginDTO.getName(), loginDTO.getPassword())) {
            logger.info("User not found: %s".formatted(loginDTO.getName()));
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
        }

        if(!personRepository.existsByNameAndPasswordAndOnlineIsFalse(loginDTO.getName(), loginDTO.getPassword())) {
            logger.info("User already online: %s".formatted(loginDTO.getName()));
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_ONLINE);
        }

        if(personRepository.existsByNameAndPasswordAndOnlineIsFalse(loginDTO.getName(), loginDTO.getPassword())) {
            personRepository.updatePersonOnlineStatus(loginDTO.getName(), loginDTO.getPassword());
            return true;
        }
        return false;
    }
}
