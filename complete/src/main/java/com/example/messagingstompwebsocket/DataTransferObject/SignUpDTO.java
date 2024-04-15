package com.example.messagingstompwebsocket.DataTransferObject;

import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SignUpDTO {

//    @NotNull TODO Exception will be thrown by Springboot
//    @Size(min=2, max=30)
    private String name;

//    @NotNull
//    @Size(min=4, max=10)
    private String password;

//    @NotNull
    @Size(min=4, max=10)
    private String passwordConfirm;

//    @NotNull
//    @Email
    @Size(min=2, max=30)
    private String email;

}
