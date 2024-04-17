package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataModel.Person;
import com.example.messagingstompwebsocket.DataTransferObject.LoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.SignUpDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionCustom;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage.INVALID_NAME;

@Service
public class PersonService implements IPersonService {
    // TODO interface, because easier to mock and extensions
    private final PersonRepository personRepository;
    private final PersonValidationUtil personValidationUtil;

    @Autowired
    public PersonService(PersonRepository personRepository, PersonValidationUtil personValidationUtil) {
        this.personRepository = personRepository;
        this.personValidationUtil = personValidationUtil;
    }

    @Override
    public boolean signUpRequest(SignUpDTO signUpDTO) throws ResponseStatusException {
        if(!PersonValidationUtil.validatePersonName(signUpDTO.getName())) {
            throw new ResponseStatusExceptionCustom(INVALID_NAME);
            // TODO Logging
        }

        if(!PersonValidationUtil.validatePersonEmail(signUpDTO.getEmail())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_EMAIL);
        }

        if(!PersonValidationUtil.validatePersonPassword(signUpDTO.getPassword())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_PASSWORD);
        }

        if(!PersonValidationUtil.validatePersonPasswordEqualsPasswordConfirm(signUpDTO.getPassword(), signUpDTO.getPasswordConfirm())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.PASSWORDS_DO_NOT_MATCH);
        }

        Person person = this.personRepository.findByNameAndEmail(signUpDTO.getName(), signUpDTO.getEmail());
        if(person == null) {
            personRepository.save(Person.builder().name(signUpDTO.getName()).email(signUpDTO.getEmail()).password(signUpDTO.getPassword()).build());
            return true;
        } throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS);
    }

    @Override
    public boolean loginRequest(LoginDTO loginDTO) {
        if(!personRepository.existsByNameAndPassword(loginDTO.getName(), loginDTO.getPassword())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
        }

        if(!personRepository.existsByNameAndPasswordAndOnlineIsFalse(loginDTO.getName(), loginDTO.getPassword())) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_ONLINE);
        }

        if(personRepository.existsByNameAndPasswordAndOnlineIsFalse(loginDTO.getName(), loginDTO.getPassword())) {
            personRepository.updatePersonOnlineStatus(loginDTO.getName(), loginDTO.getPassword());
            return true;
        }
        return false;
    }
}
