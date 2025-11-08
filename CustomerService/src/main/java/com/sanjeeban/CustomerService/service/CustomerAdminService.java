package com.sanjeeban.CustomerService.service;


import com.sanjeeban.CustomerService.customException.CustomerNotFoundException;
import com.sanjeeban.CustomerService.dto.CustomerResponseDto;
import com.sanjeeban.CustomerService.dto.CustomerResponseForOrders;
import com.sanjeeban.CustomerService.entity.Customers;
import com.sanjeeban.CustomerService.repository.CustomerRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CustomerAdminService {

    private CustomerRepository customerRepository;
    private ModelMapper modelMapper;

    public CustomerAdminService(CustomerRepository customerRepository,ModelMapper modelMapper){
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    public CustomerResponseDto getCustomerByEmail(String email) {
        Customers customer = customerRepository.getCustomerByEmail(email).orElseThrow(() -> new CustomerNotFoundException("Customer Not Found with email : "+email));
        return modelMapper.map(customer,CustomerResponseDto.class);
    }

    public CustomerResponseForOrders getCustomerByIdForOrders(Long customerId) {
        Customers customer = customerRepository.getCustomerById(customerId).orElseThrow(() -> new CustomerNotFoundException("Customer Not Found with id : "+customerId));
        return modelMapper.map(customer,CustomerResponseForOrders.class);
    }
}
