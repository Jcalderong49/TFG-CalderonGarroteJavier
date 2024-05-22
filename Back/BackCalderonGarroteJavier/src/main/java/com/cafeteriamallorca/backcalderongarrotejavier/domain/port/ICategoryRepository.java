package com.cafeteriamallorca.backcalderongarrotejavier.domain.port;

import com.cafeteriamallorca.backcalderongarrotejavier.domain.model.Category;

public interface ICategoryRepository {
    Category save (Category category);
    Iterable<Category> findAll();
    Category findById(Integer id);
    void deleteById(Integer id);

}
