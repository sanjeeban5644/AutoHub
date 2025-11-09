package com.sanjeeban.OrderService.repository;

import com.sanjeeban.OrderService.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders,Long> {




}
