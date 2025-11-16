package com.sanjeeban.OrderService.controller;

import com.sanjeeban.OrderService.dto.OrderRequest;
import com.sanjeeban.OrderService.dto.OrderStatusDto;
import com.sanjeeban.OrderService.service.CustomerOrderService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer_order")
public class CustomerOrderController {

    private CustomerOrderService customerOrderService;

    public CustomerOrderController(CustomerOrderService customerOrderService){
        this.customerOrderService = customerOrderService;
    }


    @GetMapping("/helloOrder")
    public String helloOrder(@RequestHeader("X-User-Id")String username){
        return  "Hello from Order with username"+username;
    }





    @PostMapping(value = "/orderCar",consumes = "application/json",produces = "application/json")
    public ResponseEntity<OrderStatusDto> orderCar(@RequestBody OrderRequest request){
        OrderStatusDto response = customerOrderService.orderCar(request);
        return ResponseEntity.ok(response);
    }



}
