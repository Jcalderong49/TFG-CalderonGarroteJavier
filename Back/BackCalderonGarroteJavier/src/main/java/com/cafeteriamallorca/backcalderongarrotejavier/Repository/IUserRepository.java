package com.cafeteriamallorca.backcalderongarrotejavier.Repository;


import com.cafeteriamallorca.backcalderongarrotejavier.model.User;

public interface IUserRepository {
    User save(User user);
    User findByEmail(String email);
    User findById(Integer id);
}
