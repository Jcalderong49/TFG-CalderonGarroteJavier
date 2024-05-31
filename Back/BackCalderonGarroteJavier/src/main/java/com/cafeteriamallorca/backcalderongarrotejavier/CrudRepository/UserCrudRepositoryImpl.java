package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;

import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IUserRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.mapper.UserMapper;
import com.cafeteriamallorca.backcalderongarrotejavier.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserCrudRepositoryImpl implements IUserRepository {
    private final IUserCrudRepository iUserCrudRepository;
    private final UserMapper userMapper;

    public UserCrudRepositoryImpl(IUserCrudRepository iUserCrudRepository, UserMapper userMapper) {
        this.iUserCrudRepository = iUserCrudRepository;
        this.userMapper = userMapper;
    }

    @Override
    public User save(User user) {
        return userMapper.toUser(iUserCrudRepository.save( userMapper.toUserEntity(user) ));
    }

    @Override
    public User findByEmail(String email) {
        return userMapper.toUser(iUserCrudRepository.findByEmail(email).orElseThrow(
                ()-> new RuntimeException ("User with email: "+email+ " not found")
        )   );
    }

    @Override
    public User findById(Integer id) {
        return  userMapper.toUser(iUserCrudRepository.findById(id).get());
    }
}
