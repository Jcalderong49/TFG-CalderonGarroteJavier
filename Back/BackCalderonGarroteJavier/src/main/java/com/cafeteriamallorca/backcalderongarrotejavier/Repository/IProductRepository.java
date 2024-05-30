package com.cafeteriamallorca.backcalderongarrotejavier.Repository;
import com.cafeteriamallorca.backcalderongarrotejavier.Model.Product;

public interface IProductRepository {
    Product save (Product product);
    Iterable<Product> findAll();
    Product findById(Integer id);
    void deleteById(Integer id);
}
