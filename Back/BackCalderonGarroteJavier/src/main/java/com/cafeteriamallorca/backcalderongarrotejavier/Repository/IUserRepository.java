package com.cafeteriamallorca.backcalderongarrotejavier.Repository;


import com.cafeteriamallorca.backcalderongarrotejavier.Model.User;

public interface IUserRepository {
    User save(User user);
    User findByEmail(String email);
    User findById(Integer id);
}
