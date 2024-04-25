package com.example.chat;

import java.util.ArrayList;
import java.util.List;

public class TestClass {



    public static void main(String[] args) {
        List<String> arrayList = ChatValidationUtil.badWords;
        StringBuilder stringBuilder = new StringBuilder();
        String message = "Hello, I am a motherfucker message";
        stringBuilder.append(message);

        for(int i = 0; i < arrayList.size(); i++) {
            if(message.contains(arrayList.get(i))) {
                for(int j = 0; j < message.length(); j++) {

                }

            }
        }
    }
}
