package com.cafeteriamallorca.backcalderongarrotejavier.config;

import com.cafeteriamallorca.backcalderongarrotejavier.Repository.ICategoryRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IOrderRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IProductRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Repository.IUserRepository;
import com.cafeteriamallorca.backcalderongarrotejavier.Services.*;
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
        public ProductService productService(IProductRepository iProductRepository, UploadFile uploadFile){
            return  new ProductService(iProductRepository, uploadFile);
        }
        @Bean
        public OrderService orderService(IOrderRepository iOrderRepository){
            return new OrderService(iOrderRepository);
        }
        @Bean
        public UploadFile uploadFile(){
            return new UploadFile();
        }


    }
