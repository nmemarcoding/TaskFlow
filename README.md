# TaskFlow

Welcome! I’m excited to share **TaskFlow**, a full-stack task management application I built to help you organize and track your tasks effortlessly.

Live Demo: [https://taskflow-fb731.web.app/](https://taskflow-fb731.web.app/)

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Backend Setup](#backend-setup)
   * [Frontend Setup](#frontend-setup)
5. [Usage](#usage)
6. [API Reference](#api-reference)
7. [Testing](#testing)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

I developed TaskFlow using **Spring Boot** for the backend and **React** for the frontend. The application features JWT-based authentication, secure password hashing with BCrypt, and a PostgreSQL database to store users and tasks.

Once you register and log in, you can create tasks, view your task list, update task status, delete tasks, and organize your workflow with search, filters, and sorting.

---

## Features

* **User Authentication**: Register and log in securely with JWT tokens.
* **Task Management**: Create new tasks, view all tasks, update status (Not Started, In Progress, Completed), and delete tasks.
* **Search, Filter & Sort**: Search tasks by title or description, filter by status, and sort by creation date or due date.
* **Live Server Health Monitoring**: Automatic server availability checks with retry logic when the backend is unavailable.
* **Responsive UI**: Built with React, React Router, and Tailwind CSS for a clean, responsive design.

---

## Tech Stack

* **Backend**

  * Java 21
  * Spring Boot
  * Spring Security + JWT
  * JPA / Hibernate
  * PostgreSQL
* **Frontend**

  * React
  * React Router
  * Axios
  * Tailwind CSS
* **Dev & Testing**

  * Maven
  * npm
  * JUnit (backend)
  * Jest + React Testing Library (frontend)

---

## Getting Started

### Prerequisites

* **Java 17+**
* **Maven 3.6+**
* **Node.js 14+** & **npm**
* **PostgreSQL** instance (local or managed)

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd taskflow/backend
   ```
2. **Configure database** in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://<HOST>:<PORT>/<DB_NAME>?sslmode=require
   spring.datasource.username=<DB_USER>
   spring.datasource.password=<DB_PASSWORD>
   ```
3. **Build & run**

   ```bash
   mvn clean package
   java -jar target/taskflow-0.0.1-SNAPSHOT.jar
   ```
4. The API will be available at `http://localhost:8080/api`.

### Frontend Setup

1. **Navigate to frontend folder**

   ```bash
   cd ../frontend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **(Optional) Update API base URL** in `src/services/apiService.js` if needed.
4. **Start the development server**

   ```bash
   npm start
   ```
5. The app will open at `http://localhost:3000`.

---

## Usage

1. **Register** a new account or **log in** with existing credentials.
2. **Create Task** by filling out the title, description, status, and due date.
3. **View Tasks** on the Tasks page, where you can see all your tasks.
4. **Update Status** of a task via the dropdown menu.
5. **Delete** a task you no longer need.
6. **Organize** your list with search, status filters, and sorting options.

---

## API Reference

### Authentication

| Endpoint           | Method | Description                  |
| ------------------ | ------ | ---------------------------- |
| `/api/register`    | POST   | Register a new user          |
| `/api/login`       | POST   | Log in and receive JWT       |
| `/api/check-token` | POST   | Validate existing JWT        |
| `/api/ping`        | GET    | Health check (server status) |

### Tasks

| Endpoint                     | Method | Description                               |
| ---------------------------- | ------ | ----------------------------------------- |
| `/api/tasks/create`          | POST   | Create a new task                         |
| `/api/tasks/tasks`           | GET    | Retrieve tasks for the authenticated user |
| `/api/tasks/{taskId}/status` | PUT    | Update status of a specific task          |
| `/api/tasks/{taskId}`        | DELETE | Delete a specific task                    |

---

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

---

## Contributing

I welcome improvements! Please open issues or submit pull requests to help enhance TaskFlow.

---

## License

This project is licensed under the MIT License. 🚀
