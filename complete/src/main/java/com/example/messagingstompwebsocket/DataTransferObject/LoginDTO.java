package com.example.messagingstompwebsocket.DataTransferObject;


import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LoginDTO {

    @Size(min=2, max=30)
    private String name;

    @Size(min=4, max=10)
    private String password;

}
