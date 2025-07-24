package com.nmemarzadeh.taskflow.controller;

import com.nmemarzadeh.taskflow.dto.TaskDto;
import com.nmemarzadeh.taskflow.model.Task;
import com.nmemarzadeh.taskflow.model.TaskStatus;
import com.nmemarzadeh.taskflow.model.User;
import com.nmemarzadeh.taskflow.service.TaskService;
import com.nmemarzadeh.taskflow.service.UserService;
import com.nmemarzadeh.taskflow.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public TaskController(TaskService taskService, UserService userService, JwtUtil jwtUtil) {
        this.taskService = taskService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // create a new task
    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskDto taskDto, HttpServletRequest request) {
        try {
            jwtUtil.requireValidToken(request);
            String username = jwtUtil.extractUsernameFromRequest(request);

            if (username == null || username.isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not extract username from token");
            }

            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

            Task task = new Task();
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());

            TaskStatus status = taskDto.getStatus();
            task.setStatus(status != null ? status : TaskStatus.NOT_STARTED);

            task.setDueDate(taskDto.getDueDate());
            task.setUser(user);

            Task createdTask = taskService.createTask(task);

            taskDto.setId(createdTask.getId());
            taskDto.setCreatedAt(createdTask.getCreatedAt());
            taskDto.setUserId(user.getUserId());

            return ResponseEntity.status(HttpStatus.CREATED).body(taskDto);
            
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason()); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating task: " + e.getMessage());
        }
    }
}
