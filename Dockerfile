# Use an official Gradle image to build the application
FROM gradle:7.4.2-jdk11 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper and other build files
COPY gradle gradle
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .
COPY src src

# Build the application
RUN ./gradlew build

# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot jar file from the build stage
COPY --from=build /app/build/libs/*.jar amongus.jar

# Expose the port the application runs on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "amongus.jar"]
