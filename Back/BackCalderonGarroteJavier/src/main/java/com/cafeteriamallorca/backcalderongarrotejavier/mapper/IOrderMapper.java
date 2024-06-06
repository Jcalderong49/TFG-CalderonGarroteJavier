package com.cafeteriamallorca.backcalderongarrotejavier.mapper;

import com.cafeteriamallorca.backcalderongarrotejavier.entity.OrderEntity;
import com.cafeteriamallorca.backcalderongarrotejavier.mapper.IOrderProductMapper;
import com.cafeteriamallorca.backcalderongarrotejavier.model.Order;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {IOrderProductMapper.class})
public interface IOrderMapper {
    @Mappings(
            {
                    @Mapping(source = "id", target = "id"),
                    @Mapping(source = "dateCreated", target = "dateCreated"),
                    @Mapping(source = "orderProducts", target = "orderProducts"),
                    @Mapping(source = "orderState", target = "orderState"),
                    @Mapping(source = "userEntity.id", target = "userId")
            }
    )
    Order toOrder(OrderEntity orderEntity);
    Iterable<Order> toOrderList(Iterable<OrderEntity> orderEntities);

    @InheritInverseConfiguration
    OrderEntity toOrderEntity(Order order);

}
