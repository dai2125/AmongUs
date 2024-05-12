package com.team2.game.PersonManagement;

import com.team2.game.DataModel.Person;
import com.team2.game.DataTransferObject.ChangeDetailDTO;
import com.team2.game.DataTransferObject.PersonLoginDTO;
import com.team2.game.DataTransferObject.PersonSignUpDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import com.team2.game.HttpHandling.ResponseStatusExceptionMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService implements IPersonService {

    @Autowired
    private PersonRepository personRepository;

    private static Logger logger = LoggerFactory.getLogger(PersonService.class);

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
            logger.warn("User failed to provide Password: {}", personSignUpDTO.getName());
            return false;
        }

        if(!PersonValidationUtil.validatePersonPasswordEqualsPasswordConfirm(personSignUpDTO.getPassword(), personSignUpDTO.getPasswordConfirm())) {
//            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.INVALID_EMAIL);
            logger.info("User changed Password: {}", personSignUpDTO.getName());
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
//                throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
                return false;
            }

            if(!personRepository.existsByNameAndPasswordAndOnlineIsFalse(personLoginDTO.getName(), personLoginDTO.getPassword())) {
            logger.warn("User went Online multiple times: {}", personLoginDTO.getName());
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

    @Override
    public boolean changeAccountDetail(ChangeDetailDTO changeDetailDTO) {

        if (!personRepository.existsByEmail(changeDetailDTO.getNewEmail())){
            personRepository.updatePersonDetails(
                    changeDetailDTO.getOldName(),
                    changeDetailDTO.getOldPassword(),
                    changeDetailDTO.getNewName(),
                    changeDetailDTO.getNewEmail(),
                    changeDetailDTO.getNewPassword());
            logger.info("User changed details: {} to {}", changeDetailDTO.getOldName(), changeDetailDTO.getNewName());
            return true;
        }
        return false;
    }
}
