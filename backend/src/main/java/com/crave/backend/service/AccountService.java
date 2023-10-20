package com.crave.backend.service;

import com.crave.backend.model.Account;
import com.crave.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account updateAccount(Account existingAccount, Account updatedAccount) {

        if (existingAccount != null) {
            existingAccount.setFirstName(updatedAccount.getFirstName());
            existingAccount.setLastName(updatedAccount.getLastName());
            existingAccount.setEmail(updatedAccount.getEmail());
            existingAccount.setPassword(updatedAccount.getPassword());


            accountRepository.save(existingAccount);
        }

        return existingAccount;
    }

    public void deleteAccountById(Long id) {
        accountRepository.deleteById(id);
    }

    public Account findById(Long id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.orElse(null);
    }

    public boolean exists(Long id) {
        return accountRepository.findById(id).isPresent();
    }
}
