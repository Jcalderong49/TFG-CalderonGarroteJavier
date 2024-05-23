package com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository;

import com.cafeteriamallorca.backcalderongarrotejavier.CrudRepository.IProductCrudRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Mapping.ProductMapper;
import com.cafeteriamallorca.backcalderongarrotejavier.Model.Product;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class ProductCrudRepositoryImpl implements IProductRepository {
    private final IProductCrudRepository iProductCrudRepository;
    private final ProductMapper productMapper;



    @Override
    public Product save(Product product) {
        return productMapper.toProduct(iProductCrudRepository.save(productMapper.toProductEntity(product)));
    }

    @Override
    public Iterable<Product> findAll() {
        return productMapper.toProductList(iProductCrudRepository.findAll());
    }

    @Override
    public Product findById(Integer id) {
        return productMapper.toProduct(iProductCrudRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Producto con id: "+id+" no existe")
        ) );
    }

    @Override
    public void deleteById(Integer id) {
        iProductCrudRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Producto con id: "+id+" no existe")
        );
        iProductCrudRepository.deleteById(id);
    }
}
