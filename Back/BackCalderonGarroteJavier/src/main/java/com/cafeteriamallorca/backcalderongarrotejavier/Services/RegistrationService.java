package com.cafeteriamallorca.backcalderongarrotejavier.Services;


import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IUserRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.model.User;

public class RegistrationService {
    private final IUserRepository iUserRepository;

    public RegistrationService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    public User register (User user){
        return iUserRepository.save(user);
    }
}
