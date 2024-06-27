package com.team2.chat.Service;


import org.springframework.stereotype.Service;

@Service
public interface ISocialService {

    boolean existsByNameAndPassword(String name, String password);
    int countByNameAndOnline(String name, boolean online);
}
