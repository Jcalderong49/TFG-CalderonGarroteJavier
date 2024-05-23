package com.cafeteriamallorca.backcalderongarrotejavier.Services;

import com.cafeteriamallorca.backcalderongarrotejavier.Model.Product;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IProductRepository;

public class ProductService {
    private final IProductRepository iProductRepository;

    public ProductService(IProductRepository iProductRepository) {
        this.iProductRepository = iProductRepository;
    }

    public Product save(Product product){
        return this.iProductRepository.save(product);
    }

    public Iterable<Product> findAll(){
        return this.iProductRepository.findAll();
    }

    public Product findById(Integer id){
        return this.iProductRepository.findById(id);
    }
    public void deleteById(Integer id){
        this.iProductRepository.deleteById(id);
    }
}
