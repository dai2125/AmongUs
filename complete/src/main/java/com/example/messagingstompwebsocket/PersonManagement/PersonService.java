package com.example.messagingstompwebsocket.PersonManagement;

import com.example.messagingstompwebsocket.DataModel.Person;
import com.example.messagingstompwebsocket.DataTransferObject.PersonLoginDTO;
import com.example.messagingstompwebsocket.DataTransferObject.PersonSignUpDTO;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionCustom;
import com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.example.messagingstompwebsocket.HttpHandling.ResponseStatusExceptionMessage.INVALID_NAME;

@Service
public class PersonService implements IPersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public boolean signUpRequest(PersonSignUpDTO personSignUpDTO) throws ResponseStatusExceptionCustom {
        if(!PersonValidationUtil.validatePersonName(personSignUpDTO.getName())) {
//            throw new ResponseStatusExceptionCustom(INVALID_NAME);
            return false;
        }

        if(!PersonValidationUtil.validatePersonEmail(personSignUpDTO.getEmail())) {
//            logger.info("Invalid email: %s".formatted(signUpDTO.getEmail()));
//          throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_EMAIL);
            return false;
        }

        if(!PersonValidationUtil.validatePersonPassword(personSignUpDTO.getPassword())) {
//            logger.info("Passwords do not match: %s".formatted(signUpDTO.getPassword()));
//            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_PASSWORD);
            return false;
        }

        if(!PersonValidationUtil.validatePersonPasswordEqualsPasswordConfirm(personSignUpDTO.getPassword(), personSignUpDTO.getPasswordConfirm())) {
//            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_EMAIL);
            return false;
        }

        try {
            Person person = this.personRepository.findByNameAndEmail(personSignUpDTO.getName(), personSignUpDTO.getEmail());
            if(person == null) {
                personRepository.save(Person.builder().name(personSignUpDTO.getName()).email(personSignUpDTO.getEmail()).password(personSignUpDTO.getPassword()).build());
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS);
        }

//        Person person = this.personRepository.findByNameAndEmail(personSignUpDTO.getName(), personSignUpDTO.getEmail());
//        if(person == null) {
//            personRepository.save(Person.builder().name(personSignUpDTO.getName()).email(personSignUpDTO.getEmail()).password(personSignUpDTO.getPassword()).build());
//            return true;
//        }

//        logger.info("User already exists: %s".formatted(signUpDTO.getName()));
//        throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS);
    }

    @Override
    public boolean loginRequest(PersonLoginDTO personLoginDTO) throws ResponseStatusExceptionCustom{
        try {
            if(!personRepository.existsByNameAndPassword(personLoginDTO.getName(), personLoginDTO.getPassword())) {
//            logger.info("User not found: %s".formatted(loginDTO.getName()));
//                throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
                return false;
            }

            if(!personRepository.existsByNameAndPasswordAndOnlineIsFalse(personLoginDTO.getName(), personLoginDTO.getPassword())) {
//            logger.info("User already online: %s".formatted(loginDTO.getName()));
//                throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_ONLINE);
                return false;
            }

            if(personRepository.existsByNameAndPasswordAndOnlineIsFalse(personLoginDTO.getName(), personLoginDTO.getPassword())) {
                personRepository.updatePersonOnlineStatus(personLoginDTO.getName(), personLoginDTO.getPassword());
                return true;
            } else {
//                throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_ONLINE);
                return false;
            }
        } catch(Exception e) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
        }
//        return false;
    }
}
