package com.cafeteriamallorca.backcalderongarrotejavier.domain.port;

import com.cafeteriamallorca.backcalderongarrotejavier.domain.model.User;

public interface IUserRepository {
    User save(User user);
    User findByEmail(String email);
    User findById(Integer id);
}
