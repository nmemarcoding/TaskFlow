package com.nmemarzadeh.taskflow.dto;

import java.time.LocalDateTime;

import com.nmemarzadeh.taskflow.model.TaskStatus;

public class TaskDto {

    private Long id;                  // for response
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt; // for response
    private Long userId;             // for response

    // Default constructor
    public TaskDto() {
        this.status = TaskStatus.NOT_STARTED;
    }

    // Constructor with fields
    public TaskDto(String title, String description, TaskStatus status, LocalDateTime dueDate) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    // Accept status as String (from JSON)
    public void setStatus(String status) {
        if (status == null || status.isEmpty()) {
            this.status = TaskStatus.NOT_STARTED;
        } else {
            try {
                this.status = TaskStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                this.status = TaskStatus.NOT_STARTED;
            }
        }
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
