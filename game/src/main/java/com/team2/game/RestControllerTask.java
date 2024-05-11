package com.team2.game;

import com.team2.game.GamingController.RegisterService;
import com.team2.game.GamingController.TaskDTO;
import com.team2.game.PersonManagement.IPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerTask {

    @Autowired
    private RegisterService registerService;

    @PostMapping("/task/{userId}")
    public ResponseEntity<TaskDTO> getTask() {
        TaskDTO task = registerService.getTask();
        return ResponseEntity.ok(task);
    }
}

