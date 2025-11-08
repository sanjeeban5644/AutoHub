package com.sanjeeban.CustomerService.controller;


import com.sanjeeban.CustomerService.dto.CustomerResponseDto;
import com.sanjeeban.CustomerService.dto.CustomerResponseForOrders;
import com.sanjeeban.CustomerService.service.CustomerAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerAdminController {

    private CustomerAdminService customerAdminService;


    @Autowired
    public CustomerAdminController(CustomerAdminService customerAdminService){
        this.customerAdminService = customerAdminService;
    }


    @GetMapping(path="/getCustomersByEmail")
    public ResponseEntity<CustomerResponseDto> getCustomerByEmail(@RequestParam String email){
        CustomerResponseDto response = customerAdminService.getCustomerByEmail(email);
        return ResponseEntity.ok(response);
    }


    @GetMapping(path="/getCustomerById")
    public ResponseEntity<CustomerResponseForOrders> getCustomerById(@RequestParam Long customerId){
        CustomerResponseForOrders response = customerAdminService.getCustomerByIdForOrders(customerId);
        return ResponseEntity.ok(response);
    }

}
