package com.cafeteriamallorca.backcalderongarrotejavier.Services;

import com.cafeteriamallorca.backcalderongarrotejavier.Model.User;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IUserRepository;

public class UserService {
    private final IUserRepository iUserRepository;

    public UserService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    public User save (User user){
        return  this.iUserRepository.save(user);
    }

    public User findById (Integer id){
        return this.iUserRepository.findById(id);
    }
    public User findByEmail(String email){
        return iUserRepository.findByEmail(email);
    }

}
