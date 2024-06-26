# Use an official Gradle image to build the application
FROM gradle:7.4.2-jdk17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper and other build files
COPY . .

# Set the working directory to the game subproject
WORKDIR /app/game

# Give execution permissions to gradlew
RUN chmod +x ./gradlew

# Build the application
RUN ./gradlew bootJar

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot jar file from the build stage
COPY --from=build /app/game/build/libs/*.jar amongus.jar

# Expose the port the application runs on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "amongus.jar"]
