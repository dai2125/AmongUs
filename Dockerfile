# Use the latest OpenJDK 17 image for the build stage
FROM openjdk:17-jdk AS build

# Set the working directory for the build stage
WORKDIR /app

# Copy the project files to the container
COPY . .

# Ensure the gradlew script has execute permissions
RUN chmod +x ./gradlew

# Use Gradle to build the project and create the JAR file
RUN ./gradlew build -x test

# Print the directory structure for debugging
RUN ls -l /app/game/build/libs

# Use the OpenJDK 17 runtime for the final image
FROM openjdk:17-jdk-slim

# Set the working directory for the final image
WORKDIR /app

# Copy the JAR file from the build stage to the runtime stage
COPY --from=build /app/game/build/libs/game-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application will run on
EXPOSE 8080

# Define the entry point for the container
ENTRYPOINT ["java", "-jar", "app.jar"]
