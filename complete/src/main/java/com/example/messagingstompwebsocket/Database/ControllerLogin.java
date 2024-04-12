package com.example.messagingstompwebsocket.Database;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Service
public class ControllerLogin implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
    }

    @GetMapping("/login")
    @SendTo("/login")
    public String showForm(LoginForm loginForm) {
        // TODO send boolean, integer or any confirmation

        return "login";
    }

    @PostMapping("/login")
    public String checkPersonInfo(@Valid LoginForm loginForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "login";
        }
        return "redirect:/result";
    }
}
