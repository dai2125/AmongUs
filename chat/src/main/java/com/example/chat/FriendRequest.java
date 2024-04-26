package com.example.chat;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Table(name = "friends")
public class FriendRequest {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;


}
