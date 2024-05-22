package com.cafeteriamallorca.backcalderongarrotejavier.domain.port;

import com.cafeteriamallorca.backcalderongarrotejavier.domain.model.Product;

public interface IProductRepository {
    Product save (Product product);
    Iterable<Product> findAll();
    Product findById(Integer id);
    void deleteById(Integer id);
}
