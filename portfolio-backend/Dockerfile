# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy gradle wrapper and related files
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Copy the source code
COPY src src

# Make gradlew executable and build the jar
RUN chmod +x gradlew
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port 8080 (default for Spring Boot and expected by Cloud Run)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
