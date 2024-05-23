package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;

import com.cafeteriamallorca.backcalderongarrotejavier.Entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface IUserCrudRepository extends CrudRepository<UserEntity,Integer> {
}
