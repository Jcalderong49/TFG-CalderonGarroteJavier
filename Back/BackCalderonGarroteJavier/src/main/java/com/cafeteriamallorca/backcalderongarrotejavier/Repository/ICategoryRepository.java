package com.cafeteriamallorca.backcalderongarrotejavier.Repository;


import com.cafeteriamallorca.backcalderongarrotejavier.Model.Category;

public interface ICategoryRepository {
    Category save (Category category);
    Iterable<Category> findAll();
    Category findById(Integer id);
    void deleteById(Integer id);

}
