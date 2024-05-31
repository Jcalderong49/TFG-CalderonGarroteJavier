package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;


import com.cafeteriamallorca.backcalderongarrotejavier.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface IProductCrudRepository extends CrudRepository<ProductEntity, Integer> {
}
