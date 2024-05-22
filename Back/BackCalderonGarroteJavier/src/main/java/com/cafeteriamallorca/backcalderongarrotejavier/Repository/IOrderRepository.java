package com.cafeteriamallorca.backcalderongarrotejavier.Repository;


import com.cafeteriamallorca.backcalderongarrotejavier.Model.Order;

public interface IOrderRepository {
    Order save (Order order);
    Order findById (Integer id);
    Iterable<Order> findAll();
    Iterable<Order> findByUserId(Integer userId);
    void updateStateById(Integer id, String state);
}
