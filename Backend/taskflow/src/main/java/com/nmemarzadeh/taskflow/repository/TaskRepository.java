package com.nmemarzadeh.taskflow.repository;

import com.nmemarzadeh.taskflow.model.Task;
import com.nmemarzadeh.taskflow.model.TaskStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Get all tasks by user ID
    List<Task> findByUserUserId(Long userId);

    // Get tasks by user ID and status
    List<Task> findByUserUserIdAndStatus(Long userId, TaskStatus status);

    // Optional: Find by title and user
    List<Task> findByUserUserIdAndTitleContainingIgnoreCase(Long userId, String keyword);
}
