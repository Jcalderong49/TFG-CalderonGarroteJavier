package com.cafeteriamallorca.backcalderongarrotejavier.Services;


import com.cafeteriamallorca.backcalderongarrotejavier.Model.User;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IUserRepository;

public class RegistrationService {
    private final IUserRepository iUserRepository;

    public RegistrationService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    public User register (User user){
        return iUserRepository.save(user);
    }
}
