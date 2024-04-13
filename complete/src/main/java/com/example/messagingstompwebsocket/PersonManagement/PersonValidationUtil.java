package com.example.messagingstompwebsocket.PersonManagement;

import org.springframework.stereotype.Service;

@Service
public final class PersonValidationUtil {

    private final static String NAME_REGEX = "^[a-zA-ZäöüÄÖÜß -]*$";
    private final static String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    private final static String PASSWORD_REGEX = "^[a-zA-Z0-9 ._-]{4,10}$";

    public static boolean validatePersonName(String name) {
        return name.matches(NAME_REGEX);
    }

    public static boolean validatePersonEmail(String email) {
        return email.matches(EMAIL_REGEX);
    }

    public static boolean validatePersonPasswordEqualsPasswordConfirm(String password, String passwordConfirm) {
        if(password.equals(passwordConfirm)) {
            return true;
        }
        return false;
    }

    public static boolean validatePersonPassword(String password) {
        return password.matches(PASSWORD_REGEX);
    }
    // TODO Password_Regex not used
}