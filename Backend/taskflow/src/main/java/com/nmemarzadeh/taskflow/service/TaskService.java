package com.nmemarzadeh.taskflow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nmemarzadeh.taskflow.model.Task;
import com.nmemarzadeh.taskflow.model.TaskStatus;
import com.nmemarzadeh.taskflow.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Get all tasks by user ID
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserUserId(userId);
    }

    // Get tasks by user ID and status
    public List<Task> getTasksByUserIdAndStatus(Long userId, String status) {
        return taskRepository.findByUserUserIdAndStatus(userId, TaskStatus.valueOf(status.toUpperCase()));
    }

    // Get tasks by user ID and keyword in title
    public List<Task> getTasksByUserIdAndTitleKeyword(Long userId, String keyword) {
        return taskRepository.findByUserUserIdAndTitleContainingIgnoreCase(userId, keyword);
    }

    // update task status
    public Task updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found with id: " + taskId));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    // Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // delete a task
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found with id: " + taskId));
        taskRepository.delete(task);
    }

}
