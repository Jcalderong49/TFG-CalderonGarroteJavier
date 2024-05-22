package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;


import com.cafeteriamallorca.backcalderongarrotejavier.Entity.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface ICategoryCrudRepository extends CrudRepository<CategoryEntity, Integer> {
}
