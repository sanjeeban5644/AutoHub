package com.sanjeeban.OrderService.dto;

import com.sanjeeban.OrderService.model.Car;
import com.sanjeeban.OrderService.model.Customer;

public class OrderStatusDto {
    private String orderStatus;
    private Customer customerDetails;
    private Car carDetails;

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Customer getCustomerDetails() {
        return customerDetails;
    }

    public void setCustomerDetails(Customer customerDetails) {
        this.customerDetails = customerDetails;
    }

    public Car getCarDetails() {
        return carDetails;
    }

    public void setCarDetails(Car carDetails) {
        this.carDetails = carDetails;
    }
}
