# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
# Copy gradle wrapper and related files
COPY gradlew .
COPY gradle gradle
# Make gradlew executable
RUN chmod +x gradlew
# Copy build files
COPY build.gradle settings.gradle ./
# Pre-fetch dependencies (optional but good for caching)
RUN ./gradlew dependencies --no-daemon || true
# Copy source code
COPY src src
# Build the application
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the built jar from the build stage
COPY --from=build /app/build/libs/*SNAPSHOT.jar app.jar
# Expose the default Spring Boot port
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
