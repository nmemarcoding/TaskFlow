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

I developed TaskFlow using **Spring Boot** for the backend and **React** for the frontend. The app features JWT-based authentication, secure password hashing (BCrypt), and a PostgreSQL database to persist user data and tasks.

Once you register and log in, you can create, view, update, and delete tasks. You’ll also find powerful filters, search, and sorting functionality to keep your workflow organized.

---

## Features

* **User Authentication**: Register and log in with JWT tokens.
* **Task Management**: Create, read, update (status), and delete tasks.
* **Filtering & Search**: Filter by status, search by title/description, sort by creation or due date.
* **Responsive UI**: Built with React and Tailwind CSS.
* **Server Health Check**: Automatic server availability monitoring with retries.
* **CORS Enabled**: Supports cross-origin requests.

---

## Tech Stack

* **Backend**

  * Java 17
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
  * Jest + React Testing Library (frontend)
  * JUnit (backend)

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
2. **Create** tasks by clicking **Create Task** and filling out the form.
3. **View** your task list on the **Tasks** page.
4. **Update** task status via the dropdown or **Delete** unwanted tasks.
5. **Search**, **filter**, and **sort** to organize your workflow.

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

| Endpoint                     | Method | Description                           |
| ---------------------------- | ------ | ------------------------------------- |
| `/api/tasks/create`          | POST   | Create a new task                     |
| `/api/tasks/tasks`           | GET    | Retrieve tasks for authenticated user |
| `/api/tasks/{taskId}/status` | PUT    | Update status of a specific task      |
| `/api/tasks/{taskId}`        | DELETE | Delete a specific task                |

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
