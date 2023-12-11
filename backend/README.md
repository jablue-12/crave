# Crave Backend

## Available Scripts

In the project directory, you can run the following commands:

### Install dependencies

```
mvn install
```

Install all the required dependencies to run the project.

### Run the application

```
mvn spring-boot:run mvn spring-boot:run -Dspring.profiles.active=local
```

`-Dspring.profiles.active=local` is for using the `application-local.yml` file

**Note:**
- There are required enviornment variables to be setup before running the application.
- The env variables are `SECRET_KEY` which is used for authenticating users and `ChatGPT_API_KEY` which is used for the ChatGPT feature.

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### Execute tests

```
SECRET_KEY=your_value mvn test
```

Need to provide `SECRET_KEY` since it is being used for authentication.