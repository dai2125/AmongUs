# Use the official Gradle image to build the application
FROM gradle:7.3.3-jdk11 AS build

# Set the working directory inside the container
WORKDIR /home/gradle/project

# Copy the Gradle wrapper and build files
COPY gradlew gradlew
COPY gradlew.bat gradlew.bat
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

# Copy the rest of the source code
COPY . .

# Build the application
RUN ./gradlew build

# Use the official OpenJDK image to run the application
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
