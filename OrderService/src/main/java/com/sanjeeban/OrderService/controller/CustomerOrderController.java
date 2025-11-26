package com.sanjeeban.OrderService.controller;

import com.sanjeeban.OrderService.dto.OrderRequest;
import com.sanjeeban.OrderService.dto.OrderStatusDto;
import com.sanjeeban.OrderService.service.CustomerOrderService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer_order")
public class CustomerOrderController {

    @Value("${kafka.topic.order-random-topic}")
    private String KAFKA_RANDOM_ORDER_TOPIC;


    private CustomerOrderService customerOrderService;

    private final KafkaTemplate<String,String> kafkaTemplate;

    public CustomerOrderController(CustomerOrderService customerOrderService,KafkaTemplate kafkaTemplate){
        this.customerOrderService = customerOrderService;
        this.kafkaTemplate = kafkaTemplate;
    }


    @GetMapping("/helloOrder")
    public String helloOrder(@RequestHeader("X-User-Id")String username){
        return  "Hello from Order with username"+username;
    }





    @PostMapping(value = "/orderCar",consumes = "application/json",produces = "application/json")
    public ResponseEntity<OrderStatusDto> orderCar(@RequestBody OrderRequest request){

//        kafkaTemplate.send(KAFKA_RANDOM_ORDER_TOPIC,String.valueOf(request.getCustomerId()));

        OrderStatusDto response = customerOrderService.orderCar(request);
        response.setKafkaStatus("Kafka Status is received");
        return ResponseEntity.ok(response);
    }



}
