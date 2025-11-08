package com.sanjeeban.CustomerService.customException;

public class CustomerNotFoundException extends RuntimeException{

    public CustomerNotFoundException(String msg){
        super(msg);
    }

}
