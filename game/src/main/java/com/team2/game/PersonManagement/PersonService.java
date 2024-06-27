package com.team2.game.PersonManagement;

import com.team2.game.DataModel.Person;
import com.team2.game.DataTransferObject.ChangeDetailDTO;
import com.team2.game.DataTransferObject.PersonLoginDTO;
import com.team2.game.DataTransferObject.PersonSignUpDTO;
import com.team2.game.HttpHandling.ResponseStatusExceptionCustom;
import com.team2.game.HttpHandling.ResponseStatusExceptionMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService implements IPersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public boolean signUpRequest(PersonSignUpDTO personSignUpDTO) throws ResponseStatusExceptionCustom {
        if (!PersonValidationUtil.validatePersonName(personSignUpDTO.getName())) {
            return false;
        }

        if (!PersonValidationUtil.validatePersonEmail(personSignUpDTO.getEmail())) {
            return false;
        }

        if (!PersonValidationUtil.validatePersonPassword(personSignUpDTO.getPassword())) {
            return false;
        }

        if (!PersonValidationUtil.validatePersonPasswordEqualsPasswordConfirm(personSignUpDTO.getPassword(), personSignUpDTO.getPasswordConfirm())) {
            return false;
        }

        try {
            Person person = this.personRepository.findByNameAndEmail(personSignUpDTO.getName(), personSignUpDTO.getEmail());
            if (person == null) {
                personRepository.save(Person.builder().name(personSignUpDTO.getName()).email(personSignUpDTO.getEmail()).password(personSignUpDTO.getPassword()).build());
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_ALREADY_EXISTS);
        }
    }

    @Override
    public boolean loginRequest(PersonLoginDTO personLoginDTO) throws ResponseStatusExceptionCustom {
        try {
            if (personRepository.existsByNameAndPassword(personLoginDTO.getName(), personLoginDTO.getPassword())) {
                personRepository.updatePersonOnlineStatus(personLoginDTO.getName(), personLoginDTO.getPassword());
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new ResponseStatusExceptionCustom(ResponseStatusExceptionMessage.USER_NOT_FOUND);
        }
    }

    @Override
    public boolean changeAccountDetail(ChangeDetailDTO changeDetailDTO) {

        if (!personRepository.existsByEmail(changeDetailDTO.getNewEmail())) {
            personRepository.updatePersonDetails(
                    changeDetailDTO.getOldName(),
                    changeDetailDTO.getOldPassword(),
                    changeDetailDTO.getNewName(),
                    changeDetailDTO.getNewEmail(),
                    changeDetailDTO.getNewPassword());
            return true;
        }
        return false;
    }
}
