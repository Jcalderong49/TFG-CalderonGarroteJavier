package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;


import com.cafeteriamallorca.backcalderongarrotejavier.entity.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface ICategoryCrudRepository extends CrudRepository<CategoryEntity, Integer> {
}
