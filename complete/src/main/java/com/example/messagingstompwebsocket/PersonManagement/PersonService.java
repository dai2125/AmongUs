package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataModel.Person;
import com.example.messagingstompwebsocket.DataTransferObject.PersonLoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.PersonSignUpDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionCustom;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage.INVALID_NAME;

@Service
public class PersonService implements IPersonService {

    // TODO PersonRepository @Autowired
    // TODO invalid name exception

    @Autowired
    private PersonRepository personRepository;


//    private final PersonValidationUtil personValidationUtil;

//    @Autowired
//    public PersonService(PersonValidationUtil personValidationUtil) {
//        this.personValidationUtil = personValidationUtil;
//    }

    @Override
    public boolean signUpRequest(PersonSignUpDTO personSignUp) throws ResponseStatusException {
        if(!PersonValidationUtil.validatePersonName(personSignUp.getName())) {
            throw new ResponseStatusExceptionCustom(INVALID_NAME);
            // TODO Logging
        }

        if(!PersonValidationUtil.validatePersonEmail(personSignUp.getEmail())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_EMAIL);
        }

        if(!PersonValidationUtil.validatePersonPassword(personSignUp.getPassword())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_PASSWORD);
        }

        if(!PersonValidationUtil.validatePersonPasswordEqualsPasswordConfirm(personSignUp.getPassword(), personSignUp.getPasswordConfirm())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.PASSWORDS_DO_NOT_MATCH);
        }

        Person person = this.personRepository.findByNameAndEmail(personSignUp.getName(), personSignUp.getEmail());
        if(person == null) {
            personRepository.save(Person.builder().name(personSignUp.getName()).email(personSignUp.getEmail()).password(personSignUp.getPassword()).build());
            return true;
        } throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS);
    }

    @Override
    public boolean loginRequest(PersonLoginDTO personLogin) {
        if(!personRepository.existsByNameAndPassword(personLogin.getName(), personLogin.getPassword())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
        }

        if(!personRepository.existsByNameAndPasswordAndOnlineIsFalse(personLogin.getName(), personLogin.getPassword())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_ONLINE);
        }

        if(personRepository.existsByNameAndPasswordAndOnlineIsFalse(personLogin.getName(), personLogin.getPassword())) {
            personRepository.updatePersonOnlineStatus(personLogin.getName(), personLogin.getPassword());
            return true;
        }
        return false;
    }
}
