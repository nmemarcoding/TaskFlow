# Use lightweight JDK 21 base image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy Maven wrapper & pom.xml first (to cache dependencies)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies only (layer caching)
RUN ./mvnw dependency:go-offline -B

# Copy all source code
COPY src ./src

# Package the application
RUN ./mvnw package -DskipTests

# Run the JAR file
CMD ["java", "-jar", "target/taskflow-0.0.1-SNAPSHOT.jar"]
