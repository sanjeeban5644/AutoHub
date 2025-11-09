package com.sanjeeban.OrderService.service;


import com.sanjeeban.OrderService.customException.EntityNotFoundException;
import com.sanjeeban.OrderService.dto.OrderRequest;
import com.sanjeeban.OrderService.dto.OrderStatusDto;
import com.sanjeeban.OrderService.entity.Orders;
import com.sanjeeban.OrderService.model.Car;
import com.sanjeeban.OrderService.model.Customer;
import com.sanjeeban.OrderService.repository.OrdersRepository;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;

@Service
public class CustomerOrderService {

    private final DiscoveryClient discoveryClient;
    private final RestClient restClient;
    private final OrdersRepository ordersRepository;

    public CustomerOrderService(DiscoveryClient discoveryClient, RestClient restClient, OrdersRepository ordersRepository) {
        this.discoveryClient = discoveryClient;
        this.restClient = restClient;
        this.ordersRepository = ordersRepository;
    }


    public OrderStatusDto orderCar(OrderRequest request) {
        OrderStatusDto response = new OrderStatusDto();


        //find if the customer is valid or not.

        ServiceInstance customerService = discoveryClient.getInstances("CustomerService").get(0);
        URI uri = URI.create(customerService.getUri().toString()+"/customer/getCustomerById?customerId="+request.getCustomerId());
        System.out.println("Order -> Customer URI is : "+customerService.getUri());
        Customer customerDetails  = null;

        try{
            customerDetails = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(Customer.class);
        }catch(Exception e){
            throw new EntityNotFoundException("Customer does not exist with Customer id : "+request.getCustomerId());
        }

        if(customerDetails==null){
            throw new EntityNotFoundException("Customer does not exist with Customer id : "+request.getCustomerId());

        }
        response.setCustomerDetails(customerDetails);


        // check the stock.

        ServiceInstance checkStock = discoveryClient.getInstances("CarService").get(0);
        uri = URI.create(checkStock.getUri().toString()+"/car/getCarById?carId="+request.getCarId());
        System.out.println("Order -> Car stock URI is : "+checkStock.getUri());

        Integer currentStock = 0;
        Car currentCar = null;
        try{
            currentCar = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(Car.class);
        }catch(Exception e){
            throw new EntityNotFoundException("Car does not exist with Car id : "+request.getCarId());
        }


        response.setCarDetails(currentCar);
        currentStock = currentCar.getStockQuantity();

        // place order.
        
        Car toUpdateCar = null;

        if(currentStock >= request.getQuantity()){

            ServiceInstance updateStock = discoveryClient.getInstances("CarService").get(0);
            uri = URI.create(updateStock.getUri().toString()
                    + "/car/updateCar?carId=" + request.getCarId()
                    + "&quantity=" + request.getQuantity());

            System.out.println("Order -> Car stock URI is : "+updateStock.getUri());


            try{
                toUpdateCar = restClient.put()
                        .uri(uri)
                        .retrieve()
                        .body(Car.class);

                BigDecimal totalAmountPayable = toUpdateCar.getPrice()
                        .multiply(BigDecimal.valueOf(request.getQuantity()))
                        .setScale(2);

                Orders order = new Orders();
                order.setCustomerId(customerDetails.getCustomerId());
                order.setCarId(toUpdateCar.getCarId());
                order.setQuantity(request.getQuantity());
                order.setTotalAmount(totalAmountPayable);
                order.setStatus("Order Placed");
                order.setCreatedAt(LocalDateTime.now());

                ordersRepository.save(order);

                response.setOrderDetails(order);
            }catch(Exception e){
                throw new EntityNotFoundException("Exception in updating car quantity");
            }
        }else{
            throw new EntityNotFoundException("Not enough stock quantity to place order. Current Stock : "+currentStock);
        }

        if(request.getQuantity()==toUpdateCar.getStockQuantity()){
            response.setOrderStatus("Failed");
        }else{
            response.setOrderStatus("Purchased the car");
        }

        return response;
    }
}
