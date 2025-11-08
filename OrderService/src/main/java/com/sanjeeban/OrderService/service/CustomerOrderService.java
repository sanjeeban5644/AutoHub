package com.sanjeeban.OrderService.service;


import com.sanjeeban.OrderService.dto.OrderRequest;
import com.sanjeeban.OrderService.dto.OrderStatusDto;
import com.sanjeeban.OrderService.model.Customer;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.URI;

@Service
public class CustomerOrderService {

    private final DiscoveryClient discoveryClient;
    private final RestClient restClient;

    public CustomerOrderService(DiscoveryClient discoveryClient, RestClient restClient) {
        this.discoveryClient = discoveryClient;
        this.restClient = restClient;
    }


    public OrderStatusDto orderCar(OrderRequest request) {
        OrderStatusDto response = new OrderStatusDto();


        //find if the customer is valid or not.

        ServiceInstance customerService = discoveryClient.getInstances("CustomerService").get(0);
        URI uri = URI.create(customerService.getUri().toString()+"/customer/getCustomerById?customerId="+request.getCustomerId());
        System.out.println("Order -> Customer URI is : "+customerService.getUri());

        Customer customerDetails = restClient.get()
                .uri(uri)
                .retrieve()
                .body(Customer.class);

        response.setCustomerDetails(customerDetails);


        // check the stock.
        // place order.
        return response;
    }
}
