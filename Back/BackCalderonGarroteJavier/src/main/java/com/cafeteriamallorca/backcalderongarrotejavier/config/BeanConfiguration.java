package com.cafeteriamallorca.backcalderongarrotejavier.config;

import com.cafeteriamallorca.backcalderongarrotejavier.Repository.ICategoryRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IProductRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IUserRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Services.CategoryService;
import com.cafeteriamallorca.backcalderongarrotejavier.Services.ProductService;
import com.cafeteriamallorca.backcalderongarrotejavier.Services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    public UserService userService(IUserRepository iUserRepository){
        return new UserService(iUserRepository);
    }

    @Bean
    public CategoryService categoryService(ICategoryRepository iCategoryRepository){
        return new CategoryService(iCategoryRepository);
    }

    @Bean
    public ProductService productService(IProductRepository iProductRepository){
        return  new ProductService(iProductRepository);
    }

}