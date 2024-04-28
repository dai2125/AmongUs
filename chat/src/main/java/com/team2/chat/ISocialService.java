package com.team2.chat;


import org.springframework.stereotype.Service;

@Service
public interface ISocialService {


    // TODO hier weitermachen
    boolean existsByNameAndPassword(String name, String password);
    int countByNameAndOnline(String name, boolean online);

}
