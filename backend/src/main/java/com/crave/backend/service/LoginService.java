package com.crave.backend.service;

import com.crave.backend.model.Login;
import com.crave.backend.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoginService {
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public List<Login> getLogins() {
        return loginRepository.findAll();
    }

    public Optional<Login> getLoginById(String id) {
        return loginRepository.findById(id);
    }

    public Login createLogin(Login login) {
        return loginRepository.save(login);
    }

    public Login updateLogin(Login existingLogin, Login updatedLogin) {

        if (existingLogin != null) {
            existingLogin.setUser_id(updatedLogin.getUser_id());
            existingLogin.setEmail(updatedLogin.getEmail());
            existingLogin.setPassword(updatedLogin.getPassword());


            loginRepository.save(existingLogin);
        }

        return existingLogin;
    }

    public void deleteLoginById(String id) {
        loginRepository.deleteById(id);
    }

    public Login findById(String id) {
        Optional<Login> login = loginRepository.findById(id);
        return login.orElse(null);
    }

    public boolean exists(String id) {
        return loginRepository.findById(id).isPresent();
    }
}
