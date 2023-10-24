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

# Execute a shell command to find the JAR filename
RUN jar_file=$(find /backend/target -name "*.jar" | head -n 1) && echo "JAR_FILE=$jar_file" > /backend/jar_file.txt

# Expose port
EXPOSE 8080

# Start the Spring Boot application using the dynamically discovered JAR filename
CMD [ "sh", "-c", "source /backend/jar_file.txt && java -jar $JAR_FILE" ]
