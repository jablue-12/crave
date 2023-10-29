# Use a base image with Java 17 and Maven
FROM maven:3.8.4-openjdk-17

# Set the working directory
WORKDIR /backend

# Copy the POM file for dependency resolution
COPY pom.xml ./

# Copy the rest of the backend application files
COPY src ./src

# Build the Spring Boot application within the Docker image
RUN mvn clean package

# Expose port
EXPOSE 8080

# Start the Spring Boot application
CMD ["java", "-jar", "/backend/target/backend-0.0.1-SNAPSHOT.jar"]
