package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;


import com.cafeteriamallorca.backcalderongarrotejavier.Entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface IProductCrudRepository extends CrudRepository<ProductEntity, Integer> {
}
